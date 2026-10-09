import express from 'express';
import {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  getCompanies,
  updateCompanyVerification,
  getJobs,
  updateJobApproval,
  getReports,
  updateReportStatus,
  createReport,
} from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import {
  userStatusSchema,
  companyVerificationSchema,
  jobApprovalSchema,
  reportStatusSchema,
  reportCreateSchema,
} from '../validators/admin.validator.js';

const router = express.Router();

// Report submission endpoint (open to authenticated users)
router.post('/reports/submit', protect, validateBody(reportCreateSchema), createReport);

// All other admin endpoints protected for ADMIN role only
router.use(protect, authorize('ADMIN'));

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.patch('/users/:id/status', validateBody(userStatusSchema), updateUserStatus);

router.get('/companies', getCompanies);
router.patch('/companies/:id/verification', validateBody(companyVerificationSchema), updateCompanyVerification);

router.get('/jobs', getJobs);
router.patch('/jobs/:id/approval', validateBody(jobApprovalSchema), updateJobApproval);

router.get('/reports', getReports);
router.patch('/reports/:id/status', validateBody(reportStatusSchema), updateReportStatus);

export default router;
