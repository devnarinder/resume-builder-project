import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users and their resumes
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Approve/Reject Resume
  const handleApprove = async (userId, status) => {
    await axios.post(
      `/api/admin/approve/${userId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    alert(`Resume ${status === 'approved' ? 'approved' : 'rejected'}!`);
    window.location.reload();
  };

  // Set Theme for All Users
  const handleSetTheme = async (theme) => {
    await axios.post(
      `/api/admin/theme`,
      { theme },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    alert(`Theme set to ${theme} for all users!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-6">
        <button
          onClick={() => handleSetTheme('light')}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Light Mode
        </button>
        <button
          onClick={() => handleSetTheme('dark')}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Set Dark Mode
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Resume</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">
                {user.resume ? (
                  <a
                    href={`/uploads/${user.resume}`}
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
              <td className="py-2 px-4">
                {user.status === 'approved' ? (
                  <span className="text-green-500">Approved</span>
                ) : (
                  <span className="text-red-500">Pending</span>
                )}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleApprove(user._id, 'approved')}
                  className="mr-2 px-3 py-1 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApprove(user._id, 'rejected')}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
