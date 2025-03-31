import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import ResumeUpload from './components/ResumeUpload';
import ResumeView from './components/ResumeView';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/resume/upload"
                  element={
                    <PrivateRoute>
                      <ResumeUpload />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/resume/view/:id"
                  element={
                    <PrivateRoute>
                      <ResumeView />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminPanel />
                    </PrivateRoute>
                  }
                />

              
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
