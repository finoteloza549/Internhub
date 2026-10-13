import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['JOB', 'COMPANY', 'USER'],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reason: {
      type: String,
      required: [true, 'Report reason is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['PENDING', 'REVIEWED', 'DISMISSED', 'RESOLVED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

// Performance index for admin report moderation
reportSchema.index({ status: 1, targetType: 1, createdAt: -1 });

export const Report = mongoose.model('Report', reportSchema);
