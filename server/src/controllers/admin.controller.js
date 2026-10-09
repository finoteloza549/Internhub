import { adminService } from '../services/admin.service.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getPlatformStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const data = await adminService.getAllUsers(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = req.body;
    const user = await adminService.updateUserStatus(req.params.id, isActive);
    res.status(200).json({
      success: true,
      message: `User account ${isActive ? 'activated' : 'suspended'} successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const data = await adminService.getAllCompanies(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyVerification = async (req, res, next) => {
  try {
    const { isVerified } = req.body;
    const company = await adminService.updateCompanyVerification(req.params.id, isVerified);
    res.status(200).json({
      success: true,
      message: `Company verification ${isVerified ? 'approved' : 'revoked'} successfully`,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const data = await adminService.getAllJobsForAdmin(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobApproval = async (req, res, next) => {
  try {
    const { status } = req.body;
    const job = await adminService.updateJobApproval(req.params.id, status);
    res.status(200).json({
      success: true,
      message: `Job posting approval status updated to ${status}`,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const createReport = async (req, res, next) => {
  try {
    const report = await adminService.createReport(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Report submitted for administrator review',
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const data = await adminService.getAllReports(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const report = await adminService.updateReportStatus(req.params.id, status);
    res.status(200).json({
      success: true,
      message: `Report status updated to ${status}`,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
