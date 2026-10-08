import api from './api';

export const companyService = {
  getCompanyById: async (id) => {
    return await api.get(`/companies/${id}`);
  },

  updateCompany: async (id, companyData) => {
    return await api.put(`/companies/${id}`, companyData);
  },
};
