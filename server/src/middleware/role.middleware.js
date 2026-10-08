/**
 * Role-Based Authorization Middleware Placeholder (Implemented in Phase 2)
 * @param  {...string} allowedRoles - List of permitted roles (STUDENT, EMPLOYER, ADMIN)
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    next();
  };
};
