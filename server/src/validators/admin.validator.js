import { z } from 'zod';

export const userStatusSchema = z.object({
  isActive: z.boolean({ required_error: 'isActive status boolean is required' }),
});

export const companyVerificationSchema = z.object({
  isVerified: z.boolean({ required_error: 'isVerified boolean is required' }),
});

export const jobApprovalSchema = z.object({
  status: z.enum(['ACTIVE', 'REJECTED', 'CLOSED', 'PENDING', 'DRAFT'], {
    required_error: 'Valid job approval status is required',
  }),
});

export const reportStatusSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'DISMISSED', 'RESOLVED'], {
    required_error: 'Valid report status is required',
  }),
});

export const reportCreateSchema = z.object({
  targetType: z.enum(['JOB', 'COMPANY', 'USER'], {
    required_error: 'Target type must be JOB, COMPANY, or USER',
  }),
  targetId: z.string({ required_error: 'Target ID is required' }),
  reason: z.string({ required_error: 'Reason is required' }).min(3, 'Reason must be at least 3 characters'),
  description: z.string().optional().default(''),
});
