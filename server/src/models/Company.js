import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Company must be associated with an owner user'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Company description is required'],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Company location is required'],
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
    },
    companySize: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
      default: '1-10',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model('Company', companySchema);
