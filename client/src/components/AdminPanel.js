import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('light');

  // Fetch all users and their uploaded resumes
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Approve or reject uploaded resumes
  const handleResumeApproval = async (userId, status) => {
    try {
      await axios.post(
        `/api/admin/approve/${userId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert(`Resume ${status === 'approved' ? 'approved' : 'rejected'}!`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating resume status:', error);
    }
  };

  // Set a default theme for all users
  const setDefaultTheme = async () => {
    try {
      await axios.post(
        '/api/admin/theme',
        { theme: selectedTheme },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Default theme updated successfully!');
    } catch (error) {
      console.error('Error setting default theme:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {/* Theme Control */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Set Default Theme:</h3>
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
        <button
          onClick={setDefaultTheme}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Set Theme
        </button>
      </div>

      {/* User List & Resume Control */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">User Management:</h3>
        {users.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Resume</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {user.resume ? (
                      <a
                        href={`/api/resume/view/${user.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Resume
                      </a>
                    ) : (
                      'No Resume Uploaded'
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleResumeApproval(user._id, 'approved')}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleResumeApproval(user._id, 'rejected')}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
