import api from './api';

export const userService = {
  getCurrentProfile: async () => {
    return await api.get('/users/me');
  },

  updateProfile: async (profileData) => {
    return await api.put('/users/me', profileData);
  },

  getSavedJobs: async () => {
    return await api.get('/users/me/saved-jobs');
  },
};
