import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [theme, setTheme] = useState(user?.theme || 'light');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  // Handle theme change
  const handleThemeChange = async (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);

    try {
      const { data } = await axios.post(
        '/api/user/theme',
        { theme: selectedTheme },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUser({ ...user, theme: data.theme });
      alert('Theme updated successfully!');
    } catch (error) {
      console.error('Error updating theme:', error);
      alert('Failed to update theme.');
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        '/api/user/update',
        { name, email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUser({ ...user, name: data.name, email: data.email });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">User Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Profile Info */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>

        {/* Update Button */}
        <button
          onClick={handleProfileUpdate}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
