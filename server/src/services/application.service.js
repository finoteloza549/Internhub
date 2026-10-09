import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { StudentProfile } from '../models/StudentProfile.js';
import { ApiError } from '../utils/ApiError.js';

export const applicationService = {
  /**
   * Submit an application for a job
   */
  applyForJob: async (studentId, { jobId, coverLetter, cvUrl }) => {
    // 1. Verify Job exists and is active
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    if (job.status !== 'ACTIVE') {
      throw new ApiError(400, 'This job posting is no longer active for applications');
    }

    // 2. Verify Deadline
    if (job.deadline && new Date() > new Date(job.deadline)) {
      throw new ApiError(400, 'Application deadline for this job has passed');
    }

    // 3. Check for duplicate application
    const existingApp = await Application.findOne({ studentId, jobId });
    if (existingApp) {
      throw new ApiError(409, 'You have already submitted an application for this job posting');
    }

    // 4. Resolve CV URL (use provided or student profile's default cvUrl)
    let finalCvUrl = cvUrl;
    if (!finalCvUrl) {
      const profile = await StudentProfile.findOne({ userId: studentId });
      finalCvUrl = profile?.cvUrl || '';
    }

    // 5. Create Application document
    const application = await Application.create({
      studentId,
      jobId,
      coverLetter,
      cvUrl: finalCvUrl,
      status: 'APPLIED',
    });

    return await application.populate([
      {
        path: 'jobId',
        select: 'title type location salary deadline',
        populate: { path: 'companyId', select: 'name logoUrl' },
      },
    ]);
  },

  /**
   * Get all applications submitted by a student
   */
  getStudentApplications: async (studentId) => {
    const applications = await Application.find({ studentId })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'name logoUrl location industry' },
      })
      .sort({ appliedAt: -1 });

    return applications;
  },

  /**
   * Get application details by ID
   */
  getApplicationById: async (applicationId, userId, role) => {
    const application = await Application.findById(applicationId)
      .populate('studentId', 'name email')
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'name logoUrl location' },
      });

    if (!application) {
      throw new ApiError(404, 'Application record not found');
    }

    // Verify access permission
    if (role === 'STUDENT' && application.studentId._id.toString() !== userId.toString()) {
      throw new ApiError(403, 'Not authorized to view this application');
    }

    return application;
  },

  /**
   * Update application status (used by Employers / Admins)
   */
  updateApplicationStatus: async (applicationId, status) => {
    const application = await Application.findById(applicationId);
    if (!application) {
      throw new ApiError(404, 'Application record not found');
    }

    application.status = status;
    await application.save();

    return application;
  },
};
