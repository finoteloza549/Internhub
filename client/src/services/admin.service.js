import api from './api';

export const adminService = {
  getStats: async () => {
    return await api.get('/admin/stats');
  },

  getUsers: async (params) => {
    return await api.get('/admin/users', { params });
  },

  updateUserStatus: async (id, isActive) => {
    return await api.patch(`/admin/users/${id}/status`, { isActive });
  },

  getCompanies: async (params) => {
    return await api.get('/admin/companies', { params });
  },

  updateCompanyVerification: async (id, isVerified) => {
    return await api.patch(`/admin/companies/${id}/verification`, { isVerified });
  },

  getJobs: async (params) => {
    return await api.get('/admin/jobs', { params });
  },

  updateJobApproval: async (id, status) => {
    return await api.patch(`/admin/jobs/${id}/approval`, { status });
  },

  getReports: async (params) => {
    return await api.get('/admin/reports', { params });
  },

  updateReportStatus: async (id, status) => {
    return await api.patch(`/admin/reports/${id}/status`, { status });
  },
};
