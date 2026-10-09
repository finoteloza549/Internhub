import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required' })
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  email: z
    .string({ required_error: 'Email address is required' })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password cannot exceed 100 characters'),
  role: z
    .enum(['STUDENT', 'EMPLOYER', 'ADMIN'], {
      invalid_type_error: 'Role must be STUDENT, EMPLOYER, or ADMIN',
    })
    .default('STUDENT'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email address is required' })
    .email('Please provide a valid email address')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

/**
 * Express middleware helper to validate request body using Zod schema
 */
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      success: false,
      message: formattedErrors[0] || 'Validation failed',
      errors: formattedErrors,
    });
  }
  req.body = result.data;
  next();
};
