const User = require('../models/User');
const Resume = require('../models/Resume');

// @desc Get all users
// @route GET /api/admin/users
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// @desc Approve or reject resume
// @route POST /api/admin/approve/:id
// @access Admin
const approveResume = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.status = status;
    await resume.save();
    res.status(200).json({ message: `Resume ${status} successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume status', error });
  }
};

// @desc Set default theme for all users
// @route POST /api/admin/theme
// @access Admin
const setDefaultTheme = async (req, res) => {
  const { theme } = req.body;

  try {
    await User.updateMany({}, { theme });
    res.status(200).json({ message: `Default theme set to ${theme}` });
  } catch (error) {
    res.status(500).json({ message: 'Error setting default theme', error });
  }
};

module.exports = {
  getAllUsers,
  approveResume,
  setDefaultTheme,
};
