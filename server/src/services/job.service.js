import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';
import { ApiError } from '../utils/ApiError.js';

export const jobService = {
  /**
   * Create a new job posting
   */
  createJob: async (employerId, jobData) => {
    // 1. Check if employer has a registered company profile
    let company = await Company.findOne({ ownerId: employerId });

    if (!company) {
      // Auto-create initial company profile shell for employer if not created yet
      company = await Company.create({
        ownerId: employerId,
        name: jobData.companyName || 'My Company',
        description: 'Company profile auto-generated during job posting.',
        location: jobData.location || 'Remote',
        industry: 'Technology',
      });
    }

    // 2. Create job
    const job = await Job.create({
      ...jobData,
      companyId: company._id,
      postedBy: employerId,
    });

    return await job.populate('companyId', 'name location logoUrl industry website');
  },

  /**
   * Query jobs with search, filtering, and pagination
   */
  getJobs: async (queryParams = {}) => {
    const {
      search,
      location,
      type,
      remote,
      status = 'ACTIVE',
      page = 1,
      limit = 10,
    } = queryParams;

    const query = {};

    // Filter by Status (default to ACTIVE unless explicitly requested)
    if (status) {
      query.status = status;
    }

    // Keyword Search (Title, Description, or Skills)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Filter by Location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by Job Type
    if (type) {
      query.type = type;
    }

    // Filter by Remote
    if (remote !== undefined && remote !== '') {
      query.remote = remote === 'true' || remote === true;
    }

    // Pagination math
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [results, totalResults] = await Promise.all([
      Job.find(query)
        .populate('companyId', 'name location logoUrl industry website')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Job.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalResults / limitNum) || 1;

    return {
      results,
      totalResults,
      currentPage: pageNum,
      totalPages,
    };
  },

  /**
   * Get single job by ID
   */
  getJobById: async (jobId) => {
    const job = await Job.findById(jobId)
      .populate('companyId', 'name description location logoUrl website industry companySize')
      .populate('postedBy', 'name email');

    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    return job;
  },

  /**
   * Get all jobs created by an employer
   */
  getEmployerJobs: async (employerId) => {
    const jobs = await Job.find({ postedBy: employerId })
      .populate('companyId', 'name logoUrl')
      .sort({ createdAt: -1 });

    return jobs;
  },

  /**
   * Update an existing job
   */
  updateJob: async (jobId, employerId, updateData) => {
    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    // Verify ownership (unless user is ADMIN)
    if (job.postedBy.toString() !== employerId.toString()) {
      throw new ApiError(403, 'Not authorized to modify this job posting');
    }

    Object.assign(job, updateData);
    await job.save();

    return await job.populate('companyId', 'name location logoUrl industry website');
  },

  /**
   * Delete a job posting
   */
  deleteJob: async (jobId, employerId) => {
    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    if (job.postedBy.toString() !== employerId.toString()) {
      throw new ApiError(403, 'Not authorized to delete this job posting');
    }

    await job.deleteOne();
    return { id: jobId };
  },

  /**
   * Update job status (ACTIVE, CLOSED, etc.)
   */
  updateJobStatus: async (jobId, employerId, status) => {
    const job = await Job.findById(jobId);

    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    if (job.postedBy.toString() !== employerId.toString()) {
      throw new ApiError(403, 'Not authorized to change status of this job posting');
    }

    job.status = status;
    await job.save();

    return job;
  },
};
