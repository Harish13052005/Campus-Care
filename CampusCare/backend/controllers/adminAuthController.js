const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const admin = await Admin.findOne({ email });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // ✅ Successful response
  res.status(200).json({
    message: 'Login successful',
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    }
  });
});

module.exports = { loginAdmin };


