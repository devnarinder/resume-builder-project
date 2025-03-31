const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get user profile (protected)
router.get('/profile', protect, getUserProfile);

// Update user profile (protected)
router.put('/profile', protect, updateUserProfile);

// Get all users (admin only)
router.get('/', protect, admin, getAllUsers);

// Delete user (admin only)
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
