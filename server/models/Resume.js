import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    rawText: {
      type: String,
      required: true
    },
    structuredData: {
      name: { type: String, default: null },
      email: { type: String, default: null },
      phone: { type: String, default: null },
      summary: { type: String, default: null },
      skills: [{ type: String }],
      experience: [
        {
          company: String,
          role: String,
          duration: String,
          highlights: [String]
        }
      ],
      education: [
        {
          institution: String,
          degree: String,
          year: String
        }
      ],
      projects: [
        {
          title: String,
          description: String,
          technologies: [String],
          link: String
        }
      ],
      certifications: [{ type: String }],
      achievements: [{ type: String }]
    },
    skills: [{ type: String, index: true }],
    isDefault: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
