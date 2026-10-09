import express from 'express';
import {
  getProfile,
  updateProfile,
  getSavedJobs,
  saveJob,
  unsaveJob,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorize } from '../middleware/role.middleware.js';
import { validateBody } from '../validators/auth.validator.js';
import { studentProfileSchema } from '../validators/user.validator.js';

const router = express.Router();

router.use(protect);

router.get('/me', getProfile);
router.put('/me', authorize('STUDENT'), validateBody(studentProfileSchema), updateProfile);
router.get('/me/saved-jobs', authorize('STUDENT'), getSavedJobs);

export default router;
