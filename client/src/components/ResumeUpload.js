import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus('');
  };

  // Upload resume to the server
  const uploadResume = async () => {
    if (!file) {
      alert('Please select a resume to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data } = await axios.post('/api/resume/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('Resume uploaded successfully!');
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error.response?.data?.message || error.message);
      setUploadStatus('Error uploading resume. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>

        {/* File Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Upload Button */}
        <button
          onClick={uploadResume}
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Upload Resume
        </button>

        {/* Upload Status */}
        {uploadStatus && (
          <p className={`mt-4 text-sm ${uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
