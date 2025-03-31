import React, { useState } from 'react';
import axios from 'axios';

const UploadResume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadResume = async () => {
    const formData = new FormData();
    formData.append('resume', file);

    const { data } = await axios.post('/api/resume/upload', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    alert('Resume uploaded successfully!');
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button onClick={uploadResume}>Upload Resume</button>
    </div>
  );
};

export default UploadResume;
