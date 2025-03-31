const express = require('express');
const {
  uploadResume,
  viewResume,
  editResume,
} = require('../controllers/resumeController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');

const router = express.Router();

// Upload resume (protected route)
router.post('/upload', protect, upload.single('resume'), uploadResume);

// View resume by ID (protected route)
router.get('/view/:id', protect, viewResume);

// Edit and re-upload resume (protected route)
router.put('/edit/:id', protect, upload.single('resume'), editResume);

module.exports = router;
