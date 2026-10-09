import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: [true, 'Job must be linked to a company profile'],
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job must record the posting user ID'],
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [150, 'Job title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'CONTRACT'],
        message: '{VALUE} is not a valid job type',
      },
      default: 'INTERNSHIP',
    },
    location: {
      type: String,
      required: [true, 'Job location is required'],
      trim: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    salary: {
      type: String,
      trim: true,
      default: 'Competitive',
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['DRAFT', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED'],
        message: '{VALUE} is not a valid job status',
      },
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  }
);

// MongoDB Text Search & Field Indexes for search and filter performance
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ status: 1, type: 1, remote: 1 });
jobSchema.index({ companyId: 1, postedBy: 1 });

export const Job = mongoose.model('Job', jobSchema);
