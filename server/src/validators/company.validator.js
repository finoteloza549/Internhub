import { z } from 'zod';

export const companySchema = z.object({
  name: z
    .string({ required_error: 'Company name is required' })
    .min(2, 'Company name must be at least 2 characters')
    .max(120, 'Company name cannot exceed 120 characters')
    .trim(),
  description: z
    .string({ required_error: 'Company description is required' })
    .min(10, 'Description must be at least 10 characters')
    .trim(),
  website: z.string().url('Please enter a valid website URL').or(z.literal('')).optional(),
  location: z
    .string({ required_error: 'Location is required' })
    .min(2, 'Location must be at least 2 characters')
    .trim(),
  logoUrl: z.string().url('Invalid logo URL').or(z.literal('')).optional(),
  industry: z
    .string({ required_error: 'Industry is required' })
    .min(2, 'Industry must be at least 2 characters')
    .trim(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).default('1-10'),
});
