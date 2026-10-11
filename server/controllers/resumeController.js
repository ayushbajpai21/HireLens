import Resume from '../models/Resume.js';
import { parseResumePdf } from '../services/resumeParserService.js';

// @desc    Upload & Parse Resume PDF
// @route   POST /api/resumes/upload
// @access  Private
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume file uploaded. Please attach a valid PDF document.'
      });
    }

    console.log(`[ResumeController] Processing upload: ${req.file.originalname} (${req.file.size} bytes)`);

    // Parse PDF text & extract structured data
    const { rawText, structuredData, skills } = await parseResumePdf(req.file.buffer);

    // Unset previous default resumes for this user
    await Resume.updateMany({ userId: req.user._id }, { isDefault: false });

    // Save newly parsed resume to MongoDB
    const resume = await Resume.create({
      userId: req.user._id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      rawText,
      structuredData,
      skills,
      isDefault: true
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and analyzed successfully!',
      resume
    });
  } catch (error) {
    console.error('[Resume Upload Error]:', error.message);
    next(error);
  }
};

// @desc    Get all resumes of current user
// @route   GET /api/resumes
// @access  Private
export const getMyResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .select('-rawText') // Exclude raw text for lightweight listing
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently active/default resume
// @route   GET /api/resumes/active
// @access  Private
export const getActiveResume = async (req, res, next) => {
  try {
    let resume = await Resume.findOne({ userId: req.user._id, isDefault: true });

    if (!resume) {
      // Fallback to most recent resume if none marked default
      resume = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    if (!resume) {
      return res.status(200).json({
        success: true,
        resume: null,
        message: 'No resume uploaded yet.'
      });
    }

    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.'
      });
    }

    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set a resume as active/default
// @route   PUT /api/resumes/:id/active
// @access  Private
export const setActiveResume = async (req, res, next) => {
  try {
    await Resume.updateMany({ userId: req.user._id }, { isDefault: false });

    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isDefault: true },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Active resume updated.',
      resume
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found.'
      });
    }

    // If deleted resume was default, set another one as default
    if (resume.isDefault) {
      const remaining = await Resume.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
      if (remaining) {
        remaining.isDefault = true;
        await remaining.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
