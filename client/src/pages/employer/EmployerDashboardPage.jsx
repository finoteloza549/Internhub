import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/job.service';
import { applicationService } from '../../services/application.service';
import { ApplicantCard } from '../../components/applications/ApplicantCard';
import { Loader } from '../../components/common/Loader';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

export const EmployerDashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [jobsRes, appRes] = await Promise.all([
        jobService.getEmployerJobs(),
        applicationService.getEmployerApplicants(),
      ]);

      setJobs(jobsRes.data || []);
      setApplicants(appRes.data || []);
    } catch (err) {
      // Handle gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      fetchDashboard();
    } catch (err) {
      alert(err.message || 'Failed to update candidate status');
    }
  };

  if (loading) return <Loader label="Loading employer dashboard metrics..." />;

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === 'ACTIVE').length;
  const totalApplicants = applicants.length;
  const interviewsCount = applicants.filter((a) => ['INTERVIEW', 'SHORTLISTED'].includes(a.status)).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Employer Dashboard</h1>
        <p className="text-slate-500 text-sm">Manage your company listings, active postings, and candidate pipeline</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Job Listings</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalJobs}</p>
          </div>
          <Briefcase className="w-8 h-8 text-brand-600 bg-brand-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Active Postings</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{activeJobs}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Applicants</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalApplicants}</p>
          </div>
          <Users className="w-8 h-8 text-purple-600 bg-purple-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Shortlisted / Interview</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{interviewsCount}</p>
          </div>
          <Clock className="w-8 h-8 text-amber-600 bg-amber-50 p-1.5 rounded-lg" />
        </div>
      </div>

      {/* Recent Applicants Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Recent Candidate Applications</h2>
        {applicants.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            No applicants received yet for your active job postings.
          </div>
        ) : (
          <div className="space-y-4">
            {applicants.slice(0, 3).map((app) => (
              <ApplicantCard
                key={app._id}
                application={app}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
