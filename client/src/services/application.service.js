import api from './api';

export const applicationService = {
  applyForJob: async (applicationData) => {
    return await api.post('/applications', applicationData);
  },

  getMyApplications: async () => {
    return await api.get('/applications/my');
  },

  getApplicationById: async (id) => {
    return await api.get(`/applications/${id}`);
  },

  updateApplicationStatus: async (id, status) => {
    return await api.patch(`/applications/${id}/status`, { status });
  },
};
