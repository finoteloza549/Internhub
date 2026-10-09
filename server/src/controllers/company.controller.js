import { companyService } from '../services/company.service.js';

export const getCompanyById = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCompany = async (req, res, next) => {
  try {
    const company = await companyService.getCompanyByOwnerId(req.user.id);
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const company = await companyService.upsertCompanyProfile(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Company profile saved successfully',
      data: company,
    });
  } catch (error) {
    next(error);
  }
};
