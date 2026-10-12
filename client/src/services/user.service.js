import api from './api';

export const userService = {
  getCurrentProfile: async () => {
    return await api.get('/users/me');
  },

  updateProfile: async (profileData) => {
    return await api.put('/users/me', profileData);
  },

  uploadCv: async (formData) => {
    return await api.post('/users/me/upload-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getSavedJobs: async () => {
    return await api.get('/users/me/saved-jobs');
  },
};
