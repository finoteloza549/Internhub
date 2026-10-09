import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/generateToken.js';

export const authService = {
  /**
   * Register a new user account
   */
  registerUser: async ({ name, email, password, role }) => {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email address already exists');
    }

    // 2. Create user (password hashing handled in pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'STUDENT',
    });

    // 3. Generate JWT token
    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  },

  /**
   * Authenticate existing user login
   */
  loginUser: async ({ email, password }) => {
    // 1. Find user & select password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email address or password');
    }

    // 2. Check if user account is active
    if (!user.isActive) {
      throw new ApiError(403, 'Your account has been suspended. Please contact support.');
    }

    // 3. Compare password
    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
      throw new ApiError(401, 'Invalid email address or password');
    }

    // 4. Generate JWT token
    const token = generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  },

  /**
   * Fetch authenticated user identity details
   */
  getUserById: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, 'Authenticated user profile not found');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Your account is deactivated');
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  },
};
