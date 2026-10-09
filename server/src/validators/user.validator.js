import { z } from 'zod';

export const studentProfileSchema = z.object({
  phone: z.string().optional().default(''),
  location: z.string().optional().default(''),
  university: z.string().optional().default(''),
  bio: z.string().optional().default(''),
  skills: z
    .array(z.string())
    .or(z.string().transform((val) => val.split(',').map((s) => s.trim()).filter(Boolean)))
    .default([]),
  education: z
    .array(
      z.object({
        degree: z.string(),
        fieldOfStudy: z.string(),
        institution: z.string(),
        startYear: z.string().optional(),
        endYear: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  experience: z
    .array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  cvUrl: z.string().optional().default(''),
  profileImage: z.string().optional().default(''),
});
