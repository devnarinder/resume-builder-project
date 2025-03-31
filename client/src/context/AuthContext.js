import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user details from token on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get('/api/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Login user and store token
  const login = async (credentials) => {
    const { data } = await axios.post('/api/auth/login', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  // Register new user
  const register = async (credentials) => {
    const { data } = await axios.post('/api/auth/register', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  // Logout user and clear session
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
