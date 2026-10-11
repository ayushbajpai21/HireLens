import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  registerUser, 
  fetchCurrentUser, 
  requestForgotPassword, 
  updatePassword as apiUpdatePassword, 
  logoutUser as apiLogoutUser 
} from '../api/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('career_copilot_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  // Validate existing token or cookie on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetchCurrentUser(token);
        if (response.success && response.user) {
          setUser(response.user);
          // If logged in with a temporary password, proactively prompt them
          if (response.user.isTemporaryPassword) {
            setShowProfileModal(true);
          }
        } else {
          logout();
        }
      } catch (err) {
        // If cookie or token failed, clear local state
        setUser(null);
        setToken(null);
        localStorage.removeItem('career_copilot_token');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('career_copilot_token', data.token);

      // If user has a temporary password, trigger the Reset Password popup immediately
      if (data.user.isTemporaryPassword) {
        setShowProfileModal(true);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const data = await registerUser({ name, email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('career_copilot_token', data.token);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogoutUser();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('career_copilot_token');
    setShowProfileModal(false);
  };

  const forgotPassword = async (email) => {
    return await requestForgotPassword(email);
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    const res = await apiUpdatePassword({ currentPassword, newPassword }, token);
    if (res.success && res.user) {
      setUser(res.user);
      if (res.token) {
        setToken(res.token);
        localStorage.setItem('career_copilot_token', res.token);
      }
    }
    return res;
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    changePassword,
    showProfileModal,
    setShowProfileModal,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
