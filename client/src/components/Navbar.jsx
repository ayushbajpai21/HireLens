import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  FileText, 
  Briefcase, 
  Target, 
  Sparkles, 
  LogOut, 
  User, 
  LayoutDashboard,
  ShieldAlert,
  ArrowRight,
  Zap,
  Info,
  Compass,
  Menu
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout, setShowProfileModal, setIsSidebarOpen } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Features smooth navigation handler across all routes
  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } else {
      const el = document.getElementById('features');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Authenticated Menu Items
  const authLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/resume', label: 'Resume AI' },
    { path: '/jobs', label: 'Job Analyzer' },
    { path: '/match', label: 'Match Engine' },
    { path: '/interview', label: 'Interview Prep' }
  ];

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand Logo with Modern Red, Sky Blue, and Light Purple Emblem */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-brand">
          <div className="nav-brand-logo">
            <Compass size={18} color="#ffffff" strokeWidth={2.6} />
          </div>
          <span className="nav-brand-text">
            Hire<span className="nav-brand-accent">Lens</span>
          </span>
        </Link>

        {/* Center Navigation Links (Clean, Unboxed Modern SaaS Typography) */}
        <nav className="nav-links-center">
          {isAuthenticated ? (
            <>
              {authLinks.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link-item ${active ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="nav-link-indicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
              <a
                href="#features"
                onClick={handleFeaturesClick}
                className="nav-link-item"
              >
                <span>Features</span>
              </a>
              <Link
                to="/about"
                className={`nav-link-item ${isActive('/about') ? 'active' : ''}`}
              >
                <span>About</span>
                {isActive('/about') && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            </>
          ) : (
            <>
              <a 
                href="#features" 
                onClick={handleFeaturesClick}
                className="nav-link-item"
              >
                <span>Product</span>
              </a>
              <Link 
                to="/interview" 
                className={`nav-link-item ${isActive('/interview') ? 'active' : ''}`}
              >
                <span>Interview Prep</span>
                {isActive('/interview') && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
              <Link 
                to="/jobs" 
                className={`nav-link-item ${isActive('/jobs') ? 'active' : ''}`}
              >
                <span>Job Analyzer</span>
                {isActive('/jobs') && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
              <Link 
                to="/about" 
                className={`nav-link-item ${isActive('/about') ? 'active' : ''}`}
              >
                <span>About</span>
                {isActive('/about') && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions: Desktop vs Mobile */}
        <div className="nav-right-actions">
          {isAuthenticated ? (
            <>
              {/* Desktop User Profile Button (Hidden on Mobile) */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="nav-desktop-user-btn"
                title="View Profile Settings"
              >
                <div className="nav-avatar-circle">
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'C'}</span>
                  <span className="nav-status-dot"></span>
                </div>
                <span className="nav-user-name">{user?.name || 'Candidate'}</span>
                {user?.isTemporaryPassword && (
                  <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem' }}>
                    Reset
                  </span>
                )}
              </button>

              {/* Desktop Logout Button (Hidden on Mobile) */}
              <button
                onClick={handleLogout}
                className="nav-desktop-logout-btn"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>

              {/* Mobile Profile Avatar Trigger (Shown only on Mobile) */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="nav-mobile-avatar"
                title="View Profile"
              >
                <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'C'}</span>
                <span className="nav-avatar-status-dot"></span>
              </button>
            </>
          ) : (
            <>
              {/* Desktop Auth Actions (Hidden on Mobile) */}
              <div className="nav-desktop-auth">
                <Link to="/login" className="nav-login-link">
                  Log in
                </Link>
                <Link to="/register" className="nav-signup-btn">
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Mobile Quick Sign In Button (Shown only on Mobile) */}
              <Link to="/login" className="nav-mobile-signin-btn">
                <span>Sign in</span>
              </Link>
            </>
          )}

          {/* Animated Sidebar Menu Trigger Button (Visible strictly on Mobile/Tablet) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            className="nav-sidebar-toggle-btn"
            title="Open Navigation Menu"
          >
            <Menu size={20} color="#0284c7" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
