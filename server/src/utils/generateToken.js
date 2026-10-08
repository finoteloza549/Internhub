import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for an authenticated user
 * @param {string} userId - Database ID of the user
 * @param {string} role - Role of the user (STUDENT, EMPLOYER, ADMIN)
 * @returns {string} JWT Token
 */
export const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_internhub_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ id: userId, role }, secret, {
    expiresIn,
  });
};
