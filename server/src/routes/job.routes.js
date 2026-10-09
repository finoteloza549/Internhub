import express from 'express';
import {
  getJobs,
  getJobById,
  getEmployerJobs,
  createJob,
  updateJob,
  deleteJob,
  updateJobStatus,
} from '../controllers/job.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import { jobCreateSchema, jobStatusSchema } from '../validators/job.validator.js';

const router = express.Router();

// Public Routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Employer Protected Routes
router.get('/employer/my', protect, authorize('EMPLOYER'), getEmployerJobs);
router.post('/', protect, authorize('EMPLOYER'), validateBody(jobCreateSchema), createJob);
router.put('/:id', protect, authorize('EMPLOYER'), validateBody(jobCreateSchema), updateJob);
router.delete('/:id', protect, authorize('EMPLOYER'), deleteJob);
router.patch('/:id/status', protect, authorize('EMPLOYER'), validateBody(jobStatusSchema), updateJobStatus);

export default router;
