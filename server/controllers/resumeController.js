const Resume = require('../models/Resume');
const path = require('path');
const fs = require('fs');

// @desc Upload new resume
// @route POST /api/resume/upload
// @access Private (User/Admin)
const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a PDF file' });
  }

  const filePath = req.file.path;

  try {
    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.filename,
      filePath,
    });

    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume', error });
  }
};

// @desc View resume by ID
// @route GET /api/resume/view/:id
// @access Private (User/Admin)
const viewResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.sendFile(path.resolve(resume.filePath));
  } catch (error) {
    res.status(500).json({ message: 'Error viewing resume', error });
  }
};

// @desc Edit and re-upload resume
// @route PUT /api/resume/edit/:id
// @access Private (User/Admin)
const editResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete old resume
    fs.unlinkSync(resume.filePath);

    // Update with new resume
    resume.fileName = req.file.filename;
    resume.filePath = req.file.path;
    await resume.save();

    res.status(200).json({
      message: 'Resume updated successfully',
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error });
  }
};

module.exports = {
  uploadResume,
  viewResume,
  editResume,
};
