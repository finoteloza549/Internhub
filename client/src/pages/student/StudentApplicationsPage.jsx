import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/application.service';
import { ApplicationCard } from '../../components/applications/ApplicationCard';
import { Loader } from '../../components/common/Loader';
import { FileText } from 'lucide-react';

export const StudentApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await applicationService.getMyApplications();
        setApplications(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <Loader label="Fetching your submitted applications..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
        <p className="text-slate-500 text-sm">Track your job applications and review status updates</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {!loading && applications.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-800">No Applications Submitted</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You haven't submitted any internship or job applications yet. Explore active listings and apply!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app._id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};
