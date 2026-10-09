import { User } from '../models/User.js';
import { Company } from '../models/Company.js';
import { Job } from '../models/Job.js';
import { Application } from '../models/Application.js';
import { Report } from '../models/Report.js';
import { ApiError } from '../utils/ApiError.js';
import { notificationService } from './notification.service.js';

export const adminService = {
  getPlatformStats: async () => {
    const [
      totalUsers,
      totalStudents,
      totalEmployers,
      totalJobs,
      activeJobs,
      pendingJobApprovals,
      totalApplications,
      totalReports,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'STUDENT' }),
      User.countDocuments({ role: 'EMPLOYER' }),
      Job.countDocuments(),
      Job.countDocuments({ status: 'ACTIVE' }),
      Job.countDocuments({ status: 'PENDING' }),
      Application.countDocuments(),
      Report.countDocuments({ status: 'PENDING' }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalEmployers,
      totalJobs,
      activeJobs,
      pendingJobApprovals,
      totalApplications,
      totalReports,
    };
  },

  getAllUsers: async (queryParams = {}) => {
    const { search, role, page = 1, limit = 10 } = queryParams;
    const query = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [users, totalResults] = await Promise.all([
      User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      User.countDocuments(query),
    ]);

    return {
      results: users,
      totalResults,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum) || 1,
    };
  },

  updateUserStatus: async (userId, isActive) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User account not found');
    }

    if (user.role === 'ADMIN' && !isActive) {
      throw new ApiError(403, 'Administrator accounts cannot be suspended');
    }

    user.isActive = isActive;
    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  },

  getAllCompanies: async (queryParams = {}) => {
    const { search, page = 1, limit = 10 } = queryParams;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [companies, totalResults] = await Promise.all([
      Company.find(query)
        .populate('ownerId', 'name email isActive')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Company.countDocuments(query),
    ]);

    return {
      results: companies,
      totalResults,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum) || 1,
    };
  },

  updateCompanyVerification: async (companyId, isVerified) => {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new ApiError(404, 'Company profile not found');
    }

    company.isVerified = isVerified;
    await company.save();

    return company;
  },

  getAllJobsForAdmin: async (queryParams = {}) => {
    const { status, search, page = 1, limit = 10 } = queryParams;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [jobs, totalResults] = await Promise.all([
      Job.find(query)
        .populate('companyId', 'name logoUrl isVerified')
        .populate('postedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Job.countDocuments(query),
    ]);

    return {
      results: jobs,
      totalResults,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum) || 1,
    };
  },

  updateJobApproval: async (jobId, status) => {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ApiError(404, 'Job posting not found');
    }

    job.status = status;
    await job.save();

    // Trigger Notification to Employer
    if (job.postedBy) {
      await notificationService.createNotification({
        userId: job.postedBy,
        title: 'Job Posting Approval Update',
        message: `Your job listing '${job.title}' status has been updated to '${status}'.`,
        type: 'JOB_APPROVAL',
        link: '/employer/jobs',
      });
    }

    return job;
  },

  createReport: async (reporterId, reportData) => {
    const report = await Report.create({
      ...reportData,
      reporterId,
    });
    return report;
  },

  getAllReports: async (queryParams = {}) => {
    const { status, page = 1, limit = 10 } = queryParams;
    const query = {};

    if (status) {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [reports, totalResults] = await Promise.all([
      Report.find(query)
        .populate('reporterId', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Report.countDocuments(query),
    ]);

    return {
      results: reports,
      totalResults,
      currentPage: pageNum,
      totalPages: Math.ceil(totalResults / limitNum) || 1,
    };
  },

  updateReportStatus: async (reportId, status) => {
    const report = await Report.findById(reportId);
    if (!report) {
      throw new ApiError(404, 'Report record not found');
    }

    report.status = status;
    await report.save();

    return report;
  },
};
