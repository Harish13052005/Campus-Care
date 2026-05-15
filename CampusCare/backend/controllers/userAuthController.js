const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user and store the password as plain text (not recommended)
  const newUser = await User.create({
    name,
    email,
    password, // Storing the plain password (not secure!)
  });

  // Respond with a success message
  res.status(201).json({
    message: 'User registered successfully',
    userId: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
});

// @desc    Login user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the required fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the password (no hashing, so it will be compared directly)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token for authentication (if needed)
  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET, // Secret key (make sure you set this in .env)
    { expiresIn: '1h' } // Token expiration time
  );

  // Respond with login success and token
  res.status(200).json({
    message: 'Login successful',
    userId: user._id,
    name: user.name,
    email: user.email,
    token, // Send the token for client-side storage
  });
});

module.exports = { registerUser, loginUser };