const asyncHandler = require('express-async-handler');
const Complaint = require('../models/complaintModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email Transport Error:', error);
  } else {
    console.log('✅ Email Transporter is ready');
  }
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: `"CampusCare" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err);
    if (err.response) {
      console.error('Full error response:', err.response);
    }
  }
};

// @desc    Create new complaint
const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, category, userName, rollNo, email, branch, user } = req.body;

  if (!title || !description || !category || !userName || !rollNo || !email || !branch) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const complaint = await Complaint.create({
    title,
    description,
    category,
    userName,
    rollNo,
    email,
    branch,
    status: 'Pending',
    user: user || null,
  });

  // Email to Admin
  await sendEmail(
    process.env.ADMIN_EMAIL,
    '📢 New Complaint Submitted',
    `A new complaint has been submitted.\n\nTitle: ${title}\nDescription: ${description}\nCategory: ${category}\n\nSubmitted by: ${userName} (${rollNo})`
  );

  // Email to User
  await sendEmail(
    email,
    '✅ Complaint Submitted Successfully',
    `Dear ${userName},\n\nYour complaint titled "${title}" has been successfully submitted and is under review.\n\nThank you!`
  );

  res.status(201).json({ message: 'Complaint submitted successfully.', complaint });
});

// @desc    Get all complaints
const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({}).sort({ createdAt: -1 });
  res.json(complaints);
});

// @desc    Get complaint by ID
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (complaint) {
    res.json(complaint);
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// ✅ @desc    Get complaints by user ID
const getUserComplaints = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const complaints = await Complaint.find({ user: userId }).sort({ createdAt: -1 });

  if (!complaints || complaints.length === 0) {
    res.status(404);
    throw new Error('No complaints found for this user');
  }

  res.status(200).json(complaints);
});

// @desc    Update complaint status
const updateComplaintStatus = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (complaint) {
    const previousStatus = complaint.status;
    complaint.status = req.body.status || complaint.status;
    const updatedComplaint = await complaint.save();

    console.log('Updated Complaint:', updatedComplaint); // Log for debugging

    if (previousStatus !== 'Solved' && updatedComplaint.status === 'Solved') {
      console.log(`📩 Sending solved email to user: ${updatedComplaint.email}`);
      
      await sendEmail(
        updatedComplaint.email,
        '✅ Your Complaint is Solved',
        `Dear ${updatedComplaint.userName},\n\nYour complaint titled "${updatedComplaint.title}" has been marked as solved.\n\nThank you!`
      );
    }

    res.json(updatedComplaint);
  } else {
    res.status(404);
    throw new Error('Complaint not found');
  }
});

// @desc    Delete complaint
const deleteComplaint = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({ message: 'Complaint successfully removed' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ message: 'Server error while deleting complaint' });
  }
});

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  getUserComplaints, // ✅ Exported here
  updateComplaintStatus,
  deleteComplaint,
};