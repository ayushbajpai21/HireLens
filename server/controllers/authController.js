import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

// Helper to sign JWT tokens
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'career_copilot_fallback_secret_key_123',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

// Cookie configuration
const getCookieOptions = () => ({
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      isTemporaryPassword: false
    });

    const token = generateToken(user._id);

    // Set HTTP-Only Cookie
    res.cookie('token', token, getCookieOptions());

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isTemporaryPassword: user.isTemporaryPassword,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & set cookie
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id);

    // Set HTTP-Only Cookie
    res.cookie('token', token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isTemporaryPassword: user.isTemporaryPassword,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private (Protected by JWT / Cookie)
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password - Send Temporary Password via Email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Return ambiguous success message for security best practice
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a temporary password has been sent.'
      });
    }

    // Generate random secure temporary password
    const randomSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
    const tempPassword = `Temp#${randomSuffix}!`;

    // Hash and store temporary password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(tempPassword, salt);
    user.isTemporaryPassword = true;
    await user.save();

    // Prepare email HTML
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 25px; border-radius: 12px; max-width: 550px; margin: 0 auto; border: 1px solid #1e293b;">
        <h2 style="color: #818cf8; margin-top: 0;">AI Career Copilot — Temporary Password</h2>
        <p style="color: #94a3b8; font-size: 15px;">Hello <strong>${user.name}</strong>,</p>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.5;">
          You requested to reset your password. Use the following temporary password to log in to your account:
        </p>
        
        <div style="background-color: #1e1b4b; border: 1px solid #4f46e5; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0;">
          <span style="font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #38bdf8; font-family: monospace;">
            ${tempPassword}
          </span>
        </div>

        <div style="background-color: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin-bottom: 20px;">
          <p style="margin: 0; color: #fbbf24; font-size: 14px;">
            ⚠️ <strong>Action Required:</strong> Log in with this temporary password and immediately reset your permanent password in the <em>My Profile</em> section popup.
          </p>
        </div>

        <p style="color: #64748b; font-size: 13px;">If you did not request this password reset, please ignore this email or contact support.</p>
        <hr style="border: none; border-top: 1px solid #1e293b; margin: 20px 0;" />
        <p style="color: #475569; font-size: 12px; text-align: center;">AI Career Copilot Platform</p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Temporary Login Password — AI Career Copilot',
      text: `Hello ${user.name},\n\nYour temporary password is: ${tempPassword}\n\nPlease log in and update your password under My Profile immediately.\n\nAI Career Copilot`,
      html: emailHtml
    });

    res.status(200).json({
      success: true,
      message: 'A temporary password has been sent to your email. Please check your inbox (and spam folder).'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Password (Reset from Profile Popup)
// @route   PUT /api/auth/update-password
// @access  Private (Protected by JWT / Cookie)
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your current (or temporary) password and new password.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.'
      });
    }

    // Retrieve user with passwordHash
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found.'
      });
    }

    // Verify current or temporary password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current/temporary password does not match. Please verify and try again.'
      });
    }

    // Hash and update new password
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.isTemporaryPassword = false;
    await user.save();

    // Re-issue fresh token
    const token = generateToken(user._id);
    res.cookie('token', token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Password updated successfully! Your temporary password status is now cleared.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isTemporaryPassword: false
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
};
