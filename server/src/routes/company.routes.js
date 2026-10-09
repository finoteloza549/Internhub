import express from 'express';
import { getCompanyById, getMyCompany, updateCompany } from '../controllers/company.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import { companySchema } from '../validators/company.validator.js';

const router = express.Router();

// Protected Employer route for company profile
router.get('/my/profile', protect, authorize('EMPLOYER'), getMyCompany);
router.put('/my/profile', protect, authorize('EMPLOYER'), validateBody(companySchema), updateCompany);

// Public company route
router.get('/:id', getCompanyById);

export default router;
