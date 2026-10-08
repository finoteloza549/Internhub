/**
 * Custom Error Class for standardizing operational HTTP errors across the API
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code (e.g. 400, 404, 401, 500)
   * @param {string} message - Error message detail
   * @param {Array} errors - Optional array of field-level validation errors
   * @param {string} stack - Optional custom stack trace
   */
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
