import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  ArrowLeft, 
  Zap,
  Lock,
  Mail
} from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // Forgot password mode
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const { login, forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotEmail) {
      setErrorMessage('Please enter your email.');
      return;
    }

    try {
      setForgotLoading(true);
      const res = await forgotPassword(forgotEmail);
      setSuccessMessage(res.message || 'Temporary password sent to your email.');
      setEmail(forgotEmail);
      setIsForgotMode(false);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to request temporary password.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="cosmic-auth-container stars-bg">
      {/* Background Horizon Beams */}
      <div className="cosmic-horizon-glow"></div>

      {/* Floating 3D Glowing Glass Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="cosmic-badge-floating"
      >
        <Sparkles size={34} color="#ffffff" style={{ filter: 'drop-shadow(0 0 12px #38bdf8)' }} />
      </motion.div>

      {/* Cosmic Glassmorphism Auth Card Body */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="cosmic-card-body"
      >
        <AnimatePresence mode="wait">
          {!isForgotMode ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>
                  Welcome Back
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', marginTop: '0.35rem', lineHeight: '1.4' }}>
                  Authenticate to access your HireLens workspace, resume analytics, and mock interview rounds.
                </p>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success">
                  <CheckCircle2 size={16} />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage('');
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setForgotEmail(email);
                        setErrorMessage('');
                        setSuccessMessage('');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#8b5cf6',
                        fontSize: '0.775rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      style={{ paddingRight: '2.6rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Glowing SIGN IN Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem', fontSize: '0.925rem', letterSpacing: '0.04em' }}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="spinner"></span> AUTHENTICATING...
                    </span>
                  ) : (
                    'SIGN IN'
                  )}
                </motion.button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Don't have an account yet?{' '}
                <Link to="/register" style={{ color: '#0ea5e9', fontWeight: '700' }}>
                  Sign up free
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="forgot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a' }}>
                  Reset Password
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', marginTop: '0.25rem' }}>
                  A temporary password will be dispatched via Resend emailer.
                </p>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <label className="form-label">Registered Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-cosmic"
                  style={{ width: '100%', marginTop: '0.75rem', padding: '0.85rem' }}
                  disabled={forgotLoading}
                >
                  {forgotLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="spinner"></span> SENDING...
                    </span>
                  ) : (
                    'SEND TEMPORARY PASSWORD'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsForgotMode(false);
                    setErrorMessage('');
                  }}
                  className="btn btn-glass"
                  style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
                >
                  <ArrowLeft size={15} /> Back to Sign In
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoginPage;
