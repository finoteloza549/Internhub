import { z } from 'zod';

export const jobCreateSchema = z.object({
  title: z
    .string({ required_error: 'Job title is required' })
    .min(3, 'Job title must be at least 3 characters')
    .max(150, 'Job title cannot exceed 150 characters')
    .trim(),
  description: z
    .string({ required_error: 'Job description is required' })
    .min(20, 'Job description must be at least 20 characters')
    .trim(),
  type: z
    .enum(['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'CONTRACT'], {
      invalid_type_error: 'Type must be INTERNSHIP, FULL_TIME, PART_TIME, or CONTRACT',
    })
    .default('INTERNSHIP'),
  location: z
    .string({ required_error: 'Job location is required' })
    .min(2, 'Location is required')
    .trim(),
  remote: z.boolean().default(false),
  skills: z
    .array(z.string())
    .or(z.string().transform((val) => val.split(',').map((s) => s.trim()).filter(Boolean)))
    .default([]),
  salary: z.string().optional().default('Competitive'),
  deadline: z.string({ required_error: 'Deadline is required' }),
  status: z
    .enum(['DRAFT', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED'])
    .default('ACTIVE'),
});

export const jobStatusSchema = z.object({
  status: z.enum(['DRAFT', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED'], {
    required_error: 'Valid job status is required',
  }),
});
