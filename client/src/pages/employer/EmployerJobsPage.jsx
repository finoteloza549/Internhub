import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { JobList } from '../../components/jobs/JobList';
import { PlusCircle, Briefcase } from 'lucide-react';

export const EmployerJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getJobs(); // backend route handles employer filter or query
      setJobs(res.data || res.results || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch job postings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await jobService.updateJobStatus(jobId, newStatus);
      fetchJobs();
    } catch (err) {
      alert(err.message || 'Failed to update job status');
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await jobService.deleteJob(jobId);
      fetchJobs();
    } catch (err) {
      alert(err.message || 'Failed to delete job posting');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Job Postings</h1>
          <p className="text-slate-500 text-sm">Create, edit, or close active internship and job listings</p>
        </div>

        <Link
          to="/employer/jobs/create"
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </Link>
      </div>

      <JobList
        jobs={jobs}
        loading={loading}
        error={error}
        isEmployer={true}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};
