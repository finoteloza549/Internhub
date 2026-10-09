import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Application must be linked to a student user'],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Application must be linked to a job posting'],
    },
    coverLetter: {
      type: String,
      trim: true,
      default: '',
    },
    cvUrl: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['APPLIED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'],
        message: '{VALUE} is not a valid application status',
      },
      default: 'APPLIED',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications by the same student to the same job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
