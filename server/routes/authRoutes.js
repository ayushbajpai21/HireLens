import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  updatePassword,
  logoutUser
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/update-password', protect, updatePassword);
router.post('/logout', logoutUser);

export default router;
