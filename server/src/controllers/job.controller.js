import { jobService } from '../services/job.service.js';

export const getJobs = async (req, res, next) => {
  try {
    const data = await jobService.getJobs(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployerJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getEmployerJobs(req.user.id);
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      message: 'Job posting deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const job = await jobService.updateJobStatus(req.params.id, req.user.id, status);
    res.status(200).json({
      success: true,
      message: `Job status updated to ${status}`,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};
