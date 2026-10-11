import multer from 'multer';

// Use memory storage so we can read file buffer directly
const storage = multer.memoryStorage();

// File filter: accept only PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Please upload a PDF document (.pdf only).'), false);
  }
};

export const uploadResumePdf = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB max limit
  },
  fileFilter
}).single('resume');
