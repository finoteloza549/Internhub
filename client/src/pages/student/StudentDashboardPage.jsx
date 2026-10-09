import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/application.service';
import { userService } from '../../services/user.service';
import { ApplicationCard } from '../../components/applications/ApplicationCard';
import { Loader } from '../../components/common/Loader';
import { FileText, Eye, CheckCircle2, Bookmark } from 'lucide-react';

export const StudentDashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, savedRes] = await Promise.all([
          applicationService.getMyApplications(),
          userService.getSavedJobs(),
        ]);
        setApplications(appRes.data || []);
        setSavedJobs(savedRes.data || []);
      } catch (err) {
        // Handle gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loader label="Loading student dashboard metrics..." />;

  const totalApps = applications.length;
  const underReview = applications.filter((a) => ['REVIEWING', 'SHORTLISTED', 'INTERVIEW'].includes(a.status)).length;
  const accepted = applications.filter((a) => a.status === 'ACCEPTED').length;
  const totalSaved = savedJobs.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 text-sm">Overview of your job applications and bookmarked listings</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Applications</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalApps}</p>
          </div>
          <FileText className="w-8 h-8 text-brand-600 bg-brand-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">In Pipeline / Review</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{underReview}</p>
          </div>
          <Eye className="w-8 h-8 text-amber-600 bg-amber-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Accepted</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{accepted}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Saved Jobs</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{totalSaved}</p>
          </div>
          <Bookmark className="w-8 h-8 text-purple-600 bg-purple-50 p-1.5 rounded-lg" />
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
        {applications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
            No applications submitted yet. Browse jobs to submit your first application!
          </div>
        ) : (
          <div className="space-y-4">
            {applications.slice(0, 3).map((app) => (
              <ApplicationCard key={app._id} application={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
