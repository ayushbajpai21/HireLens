import express from 'express';
import {
  uploadResume,
  getMyResumes,
  getActiveResume,
  getResumeById,
  setActiveResume,
  deleteResume
} from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadResumePdf } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, uploadResumePdf, uploadResume);
router.get('/', protect, getMyResumes);
router.get('/active', protect, getActiveResume);
router.get('/:id', protect, getResumeById);
router.put('/:id/active', protect, setActiveResume);
router.delete('/:id', protect, deleteResume);

export default router;
