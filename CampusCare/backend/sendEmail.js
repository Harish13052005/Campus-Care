// sendEmail.js

const nodemailer = require('nodemailer');

// Load environment variables from the .env file
require('dotenv').config();

// Create a reusable transporter object using Gmail (or another service)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Change this based on your email provider
  auth: {
    user: process.env.EMAIL_USER,  // Your email (from .env file)
    pass: process.env.EMAIL_PASS,  // Your email password or app password (from .env file)
  },
});

// Function to send email to Admin when a complaint is submitted
const sendEmailToAdmin = (complaintDetails) => {
  const { title, description, category, userEmail } = complaintDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email (your email)
    to: process.env.ADMIN_EMAIL,   // Admin email (set this in the .env file)
    subject: 'New Complaint Submitted',
    text: `
      A new complaint has been submitted:
      Title: ${title}
      Description: ${description}
      Category: ${category}
      User Email: ${userEmail}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email to admin:', error);
    } else {
      console.log('Email sent to admin: ' + info.response);
    }
  });
};

// Function to send email to User when complaint is marked as solved
const sendEmailToUser = (userEmail, complaintTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email (your email)
    to: userEmail,                 // User email (from the complaint)
    subject: 'Complaint Status Update',
    text: `
      Your complaint "${complaintTitle}" has been marked as solved.
      Thank you for using our service.
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email to user:', error);
    } else {
      console.log('Email sent to user: ' + info.response);
    }
  });
};

module.exports = { sendEmailToAdmin, sendEmailToUser };
