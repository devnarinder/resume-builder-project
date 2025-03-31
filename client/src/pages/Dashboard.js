import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome, {user?.name}!</h1>
      <p className="text-lg text-gray-700 mb-6">Manage your resume and account settings easily.</p>

      <div className="space-x-4 mb-4">
        <Link
          to="/resume/upload"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Upload Resume
        </Link>
        <Link
          to="/resume/view"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          View Resume
        </Link>
        <Link
          to="/theme"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Manage Theme
        </Link>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
