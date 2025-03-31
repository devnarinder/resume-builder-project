import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const navigate = useNavigate();

  // Toggle theme and store in local storage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Apply stored theme on page load
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
              Resume Builder
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              Upload Resume
            </Link>
          </div>

          {/* Theme Toggle & Logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-700 dark:text-white" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
