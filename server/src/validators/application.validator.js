import { z } from 'zod';

export const applicationCreateSchema = z.object({
  jobId: z.string({ required_error: 'Job ID is required' }),
  coverLetter: z.string().optional().default(''),
  cvUrl: z.string().optional().default(''),
});

export const applicationStatusSchema = z.object({
  status: z.enum(['APPLIED', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'], {
    required_error: 'Valid application status is required',
  }),
});
