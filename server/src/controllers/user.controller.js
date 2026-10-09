import { userService } from '../services/user.service.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await userService.getStudentProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await userService.updateStudentProfile(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedJobs = async (req, res, next) => {
  try {
    const savedJobs = await userService.getSavedJobs(req.user.id);
    res.status(200).json({
      success: true,
      data: savedJobs,
    });
  } catch (error) {
    next(error);
  }
};

export const saveJob = async (req, res, next) => {
  try {
    const saved = await userService.saveJob(req.user.id, req.params.id);
    res.status(201).json({
      success: true,
      message: 'Job saved to your bookmarks',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

export const unsaveJob = async (req, res, next) => {
  try {
    await userService.unsaveJob(req.user.id, req.params.id);
    res.status(200).json({
      success: true,
      message: 'Job removed from your saved bookmarks',
    });
  } catch (error) {
    next(error);
  }
};
