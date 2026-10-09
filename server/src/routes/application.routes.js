import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getEmployerApplicants,
  getApplicationById,
  updateApplicationStatus,
} from '../controllers/application.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import {
  applicationCreateSchema,
  applicationStatusSchema,
} from '../validators/application.validator.js';

const router = express.Router();

router.use(protect);

// Student Endpoints
router.post('/', authorize('STUDENT'), validateBody(applicationCreateSchema), applyForJob);
router.get('/my', authorize('STUDENT'), getMyApplications);

// Employer Endpoints
router.get('/employer/applicants', authorize('EMPLOYER'), getEmployerApplicants);

// Common / Shared Endpoints
router.get('/:id', getApplicationById);
router.patch('/:id/status', authorize('EMPLOYER', 'ADMIN'), validateBody(applicationStatusSchema), updateApplicationStatus);

export default router;
