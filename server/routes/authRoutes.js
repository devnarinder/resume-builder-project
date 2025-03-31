const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user and get token
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/me', protect, getUserProfile);

module.exports = router;
