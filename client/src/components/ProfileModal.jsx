import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  KeyRound, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const ProfileModal = () => {
  const { user, showProfileModal, setShowProfileModal, changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!showProfileModal || !user) return null;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill out all password fields.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword({ currentPassword, newPassword });
      setSuccess(res.message || 'Password successfully updated!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccess('');
      }, 4000);
    } catch (err) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="card" style={{
        maxWidth: '520px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)',
        border: '1px solid #e2e8f0',
        background: '#ffffff',
        color: '#0f172a'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setShowProfileModal(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '6px'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            background: '#e0f2fe',
            color: '#0284c7',
            padding: '0.75rem',
            borderRadius: '12px'
          }}>
            <User size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a' }}>My Profile</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Account information & security settings
            </p>
          </div>
        </div>

        {/* Temporary Password Notice Banner */}
        {user?.isTemporaryPassword && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <ShieldAlert size={22} className="text-amber-400" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.9rem' }}>
                Temporary Password Active
              </div>
              <p style={{ color: '#fde68a', fontSize: '0.825rem', marginTop: '0.25rem' }}>
                You logged in using a temporary password sent to your email. Please set your own permanent password below to secure your account.
              </p>
            </div>
          </div>
        )}

        {/* Profile Info Card */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Full Name</span>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#0f172a' }}>{user?.name || 'Candidate'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Email Address</span>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: '#0f172a' }}>{user?.email || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Password Status</span>
            <span className={user?.isTemporaryPassword ? 'badge badge-warning' : 'badge badge-success'}>
              {user?.isTemporaryPassword ? 'Temporary' : 'Permanent'}
            </span>
          </div>
        </div>

        {/* Reset Password Form */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <KeyRound size={18} className="text-indigo-400" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
              {user?.isTemporaryPassword ? 'Set Permanent Password' : 'Change Password'}
            </h3>
          </div>

          {error && (
            <div className="alert alert-danger" style={{ padding: '0.7rem 1rem', fontSize: '0.85rem' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success" style={{ padding: '0.7rem 1rem', fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="currentPassword">
                {user?.isTemporaryPassword ? 'Temporary Password (from email)' : 'Current Password'}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter current or temporary password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  style={{ paddingRight: '2.6rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem'
                  }}
                  title={showCurrent ? 'Hide password' : 'Show password'}
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ paddingRight: '2.6rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem'
                  }}
                  title={showNew ? 'Hide password' : 'Show password'}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingRight: '2.6rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem'
                  }}
                  title={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner"></span> Updating...
                  </span>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
