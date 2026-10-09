import { Company } from '../models/Company.js';
import { ApiError } from '../utils/ApiError.js';

export const companyService = {
  /**
   * Get company profile by ID
   */
  getCompanyById: async (companyId) => {
    const company = await Company.findById(companyId).populate('ownerId', 'name email');
    if (!company) {
      throw new ApiError(404, 'Company profile not found');
    }
    return company;
  },

  /**
   * Get company profile owned by employer user
   */
  getCompanyByOwnerId: async (ownerId) => {
    const company = await Company.findOne({ ownerId }).populate('ownerId', 'name email');
    return company;
  },

  /**
   * Create or update employer's company profile
   */
  upsertCompanyProfile: async (ownerId, companyData) => {
    let company = await Company.findOne({ ownerId });

    if (company) {
      Object.assign(company, companyData);
      await company.save();
    } else {
      company = await Company.create({
        ...companyData,
        ownerId,
      });
    }

    return company;
  },
};
