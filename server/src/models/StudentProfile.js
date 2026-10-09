import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: String },
    endYear: { type: String },
  },
  { _id: true }
);

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
  },
  { _id: true }
);

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    phone: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    university: { type: String, trim: true, default: '' },
    bio: { type: String, trim: true, default: '' },
    skills: { type: [String], default: [] },
    education: { type: [educationSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    cvUrl: { type: String, trim: true, default: '' },
    profileImage: { type: String, trim: true, default: '' },
  },
  {
    timestamps: true,
  }
);

export const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);
