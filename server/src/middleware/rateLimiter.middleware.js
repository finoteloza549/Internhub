import rateLimit from 'express-rate-limit';

/**
 * Standard API rate limiter for general endpoints
 * 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: () => process.env.NODE_ENV === 'test', // Skip in automated testing
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes',
  },
});

/**
 * Strict rate limiter for sensitive authentication endpoints
 * 15 attempts per 15 minutes per IP to protect against brute-force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth attempts per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === 'test', // Skip in automated testing
  message: {
    success: false,
    message: 'Too many login/registration attempts from this IP, please try again in 15 minutes',
  },
});
