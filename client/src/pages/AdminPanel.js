import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and resumes
  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Approve/Reject Resume
  const handleResumeAction = async (userId, action) => {
    try {
      await api.post(`/admin/approve/${userId}`, { action });
      alert(`Resume ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      fetchUsers(); // Refresh user list after action
    } catch (error) {
      console.error('Error updating resume status:', error);
    }
  };

  // Set Default Theme for All Users
  const setDefaultTheme = async (theme) => {
    try {
      await api.post('/admin/theme', { theme });
      alert(`Default theme set to ${theme} successfully!`);
    } catch (error) {
      console.error('Error setting default theme:', error);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Manage Users & Resumes</h2>

      {/* Set Default Theme */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Set Default Theme:</h3>
        <button
          onClick={() => setDefaultTheme('light')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Light Mode
        </button>
        <button
          onClick={() => setDefaultTheme('dark')}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Dark Mode
        </button>
      </div>

      {/* User List & Resume Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">User List:</h3>
        <table className="w-full border-collapse border border-gray-300">
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
              <tr key={user._id} className="text-center">
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
                    'No resume uploaded'
                  )}
                </td>
                <td className="border p-2">
                  {user.resume && (
                    <>
                      <button
                        onClick={() => handleResumeAction(user._id, 'approve')}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleResumeAction(user._id, 'reject')}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
