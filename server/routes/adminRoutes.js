const express = require('express');
const {
  getAllUsers,
  approveResume,
  setDefaultTheme,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users and their resumes (Admin only)
router.get('/users', protect, admin, getAllUsers);

// Approve or reject a resume by ID (Admin only)
router.post('/approve/:id', protect, admin, approveResume);

// Set default theme for all users (Admin only)
router.post('/theme', protect, admin, setDefaultTheme);

module.exports = router;
