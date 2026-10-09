import React, { useState, useEffect } from 'react';
import { userService } from '../../services/user.service';
import { jobService } from '../../services/job.service';
import { JobList } from '../../components/jobs/JobList';
import { Bookmark } from 'lucide-react';

export const StudentSavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userService.getSavedJobs();
      setSavedJobs(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Saved Jobs</h1>
        <p className="text-slate-500 text-sm">Your bookmarked internships and job listings</p>
      </div>

      <JobList jobs={savedJobs} loading={loading} error={error} />
    </div>
  );
};
