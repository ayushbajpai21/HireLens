import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import {
  FileText,
  Briefcase,
  Target,
  Sparkles,
  LayoutDashboard,
  Zap,
  Info,
  Compass,
  User,
  LogOut,
  X,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Menu,
  CheckCircle2
} from 'lucide-react';

const Sidebar = () => {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    setShowProfileModal, 
    isSidebarOpen, 
    setIsSidebarOpen 
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    setIsSidebarOpen(false);
    await logout();
    navigate('/login');
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    setIsSidebarOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  // Authenticated workspace navigation items
  const authNavItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      desc: 'Real-time telemetry & activity',
      icon: LayoutDashboard,
      color: '#0ea5e9',
      bgColor: '#e0f2fe'
    },
    {
      path: '/resume',
      label: 'Resume AI',
      desc: 'Lossless PDF text parsing',
      icon: FileText,
      color: '#0284c7',
      bgColor: '#e0f2fe'
    },
    {
      path: '/jobs',
      label: 'Job Analyzer',
      desc: 'JD skill requirement breakdown',
      icon: Briefcase,
      color: '#8b5cf6',
      bgColor: '#f3e8ff'
    },
    {
      path: '/match',
      label: 'Match Engine',
      desc: 'Deterministic skill gap score',
      icon: Target,
      color: '#a855f7',
      bgColor: '#f3e8ff'
    },
    {
      path: '/interview',
      label: 'Interview Prep',
      desc: '15 Qs tailored to resume skills',
      icon: Sparkles,
      color: '#ef4444',
      bgColor: '#fee2e2',
      badge: '15 Qs'
    }
  ];

  // Public exploration navigation items
  const publicNavItems = [
    {
      path: '/',
      label: 'Home Overview',
      desc: 'Platform landing & live preview',
      icon: Compass,
      color: '#0ea5e9',
      bgColor: '#e0f2fe'
    },
    {
      path: '/interview',
      label: 'Interview Prep',
      desc: '15 technical assessment questions',
      icon: Sparkles,
      color: '#ef4444',
      bgColor: '#fee2e2',
      badge: '15 Qs'
    },
    {
      path: '/about',
      label: 'About Platform',
      desc: 'Microservices architecture',
      icon: Info,
      color: '#0284c7',
      bgColor: '#e0f2fe'
    }
  ];

  return (
    <>
      {/* MOBILE / TABLET SLIDE-OUT SIDEBAR DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1050
              }}
            />

            {/* Sliding Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '360px',
                background: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
                zIndex: 1100,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
              }}
            >
              {/* Sidebar Header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}>
                <Link 
                  to={isAuthenticated ? "/dashboard" : "/"} 
                  onClick={() => setIsSidebarOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #0ea5e9 50%, #8b5cf6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(14, 165, 233, 0.35)'
                  }}>
                    <Compass size={20} color="#ffffff" strokeWidth={2.6} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '900', fontSize: '1.2rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      Hire<span style={{ color: '#0ea5e9' }}>Lens</span>
                      <span style={{ color: '#ef4444' }}>.</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600' }}>
                      Deterministic AI Copilot
                    </div>
                  </div>
                </Link>

                {/* Close Button with rotate hover animation */}
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(false)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.15s ease'
                  }}
                  title="Close sidebar"
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* User Profile Mini Bar (if logged in) */}
              {isAuthenticated && (
                <div style={{
                  padding: '1rem 1.5rem',
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: '#e0f2fe',
                      color: '#0284c7',
                      border: '1px solid #7dd3fc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem'
                    }}>
                      {user?.name ? user.name[0].toUpperCase() : 'C'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '800', color: '#0f172a' }}>
                        {user?.name || 'Candidate'}
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#64748b', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user?.email || 'Logged in'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      setShowProfileModal(true);
                    }}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#0284c7',
                      cursor: 'pointer'
                    }}
                  >
                    Profile
                  </button>
                </div>
              )}

              {/* Sidebar Navigation Items Body */}
              <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                
                {/* Section: Main Workspace */}
                <div>
                  <div style={{
                    fontSize: '0.725rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                    padding: '0 0.5rem 0.5rem 0.5rem'
                  }}>
                    {isAuthenticated ? 'Career Intelligence' : 'Explore Platform'}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {(isAuthenticated ? authNavItems : publicNavItems).map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);

                      return (
                        <motion.div
                          key={item.path}
                          whileHover={{ x: 6, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem 0.85rem',
                              borderRadius: '12px',
                              background: active ? '#f0f9ff' : 'transparent',
                              border: active ? '1px solid #7dd3fc' : '1px solid transparent',
                              textDecoration: 'none',
                              transition: 'all 0.15s ease'
                            }}
                            className={!active ? 'sidebar-item-hover' : ''}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <motion.div
                                whileHover={{ rotate: 8, scale: 1.15 }}
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '10px',
                                  background: item.bgColor,
                                  color: item.color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: `1px solid ${item.color}35`,
                                  boxShadow: `0 2px 8px ${item.color}25`
                                }}
                              >
                                <Icon size={18} />
                              </motion.div>
                              <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: active ? '800' : '700', color: active ? '#0284c7' : '#0f172a' }}>
                                  {item.label}
                                </div>
                                <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                                  {item.desc}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              {item.badge && (
                                <span className="badge badge-success" style={{ fontSize: '0.675rem', padding: '0.1rem 0.45rem' }}>
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight size={15} color={active ? '#0284c7' : '#94a3b8'} />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Architecture & Discover */}
                <div>
                  <div style={{
                    fontSize: '0.725rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                    padding: '0 0.5rem 0.5rem 0.5rem'
                  }}>
                    Platform Features
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {/* Features smooth scroll link */}
                    <motion.div
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    >
                      <a
                        href="#features"
                        onClick={handleFeaturesClick}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.85rem',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          cursor: 'pointer'
                        }}
                        className="sidebar-item-hover"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <motion.div
                            whileHover={{ rotate: 12, scale: 1.2 }}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: '#f3e8ff',
                              color: '#8b5cf6',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #d8b4fe',
                              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
                            }}
                          >
                            <Zap size={18} />
                          </motion.div>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                              Production Features
                            </div>
                            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                              Deterministic architecture showcase
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={15} color="#94a3b8" />
                      </a>
                    </motion.div>

                    {/* About Link */}
                    <motion.div
                      whileHover={{ x: 6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    >
                      <Link
                        to="/about"
                        onClick={() => setIsSidebarOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.85rem',
                          borderRadius: '12px',
                          background: isActive('/about') ? '#f0f9ff' : 'transparent',
                          border: isActive('/about') ? '1px solid #7dd3fc' : '1px solid transparent',
                          textDecoration: 'none'
                        }}
                        className={!isActive('/about') ? 'sidebar-item-hover' : ''}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: '#e0f2fe',
                              color: '#0284c7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #7dd3fc',
                              boxShadow: '0 2px 8px rgba(14, 165, 233, 0.2)'
                            }}
                          >
                            <Info size={18} />
                          </motion.div>
                          <div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
                              System Architecture
                            </div>
                            <div style={{ fontSize: '0.725rem', color: '#64748b' }}>
                              FastAPI, PyMuPDF &amp; Groq Llama 3.3
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={15} color="#94a3b8" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer Action */}
              <div style={{
                padding: '1.25rem',
                borderTop: '1px solid #e2e8f0',
                background: '#f8fafc'
              }}>
                {isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      background: '#fee2e2',
                      border: '1px solid #fca5a5',
                      color: '#dc2626',
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out of HireLens</span>
                  </motion.button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <Link
                      to="/register"
                      onClick={() => setIsSidebarOpen(false)}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.75rem', fontSize: '0.875rem' }}
                    >
                      <span>Create Free Account</span>
                      <ArrowRight size={15} />
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsSidebarOpen(false)}
                      style={{
                        textAlign: 'center',
                        color: '#0f172a',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        textDecoration: 'none',
                        padding: '0.4rem'
                      }}
                    >
                      Already a user? Sign In
                    </Link>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
