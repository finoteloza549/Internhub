import { StudentProfile } from '../models/StudentProfile.js';
import { SavedJob } from '../models/SavedJob.js';
import { Job } from '../models/Job.js';
import { ApiError } from '../utils/ApiError.js';

export const userService = {
  /**
   * Get student profile by user ID (creates profile shell if not existing)
   */
  getStudentProfile: async (userId) => {
    let profile = await StudentProfile.findOne({ userId }).populate('userId', 'name email role');

    if (!profile) {
      profile = await StudentProfile.create({ userId });
      profile = await profile.populate('userId', 'name email role');
    }

    return profile;
  },

  /**
   * Update student profile fields
   */
  updateStudentProfile: async (userId, profileData) => {
    let profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      profile = await StudentProfile.create({ ...profileData, userId });
    } else {
      Object.assign(profile, profileData);
      await profile.save();
    }

    return await profile.populate('userId', 'name email role');
  },

  /**
   * Save a job for student
   */
  saveJob: async (studentId, jobId) => {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job not found');
    }

    const existingSave = await SavedJob.findOne({ studentId, jobId });
    if (existingSave) {
      throw new ApiError(409, 'Job is already saved in your bookmarks');
    }

    const savedJob = await SavedJob.create({ studentId, jobId });
    return savedJob;
  },

  /**
   * Unsave a job for student
   */
  unsaveJob: async (studentId, jobId) => {
    const savedJob = await SavedJob.findOneAndDelete({ studentId, jobId });
    if (!savedJob) {
      throw new ApiError(404, 'Saved job bookmark not found');
    }
    return { jobId };
  },

  /**
   * Get all saved jobs for student
   */
  getSavedJobs: async (studentId) => {
    const savedJobs = await SavedJob.find({ studentId })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'name logoUrl location industry' },
      })
      .sort({ createdAt: -1 });

    return savedJobs.map((item) => item.jobId).filter(Boolean);
  },
};
