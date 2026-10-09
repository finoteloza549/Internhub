import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Authentication token missing. Please log in.');
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_internhub_key';
    const decoded = jwt.verify(token, secret);

    // Verify user exists and is active
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new ApiError(401, 'The user belonging to this token no longer exists.');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Your account has been deactivated.');
    }

    // Attach user to request object
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
