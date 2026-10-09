import React, { useState, useEffect } from 'react';
import { applicationService } from '../../services/application.service';
import { ApplicantCard } from '../../components/applications/ApplicantCard';
import { Loader } from '../../components/common/Loader';
import { Users, Filter } from 'lucide-react';

export const EmployerApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchApplicants = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await applicationService.getEmployerApplicants();
      setApplicants(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      fetchApplicants();
    } catch (err) {
      alert(err.message || 'Failed to update candidate status');
    }
  };

  const filteredApplicants = statusFilter
    ? applicants.filter((a) => a.status === statusFilter)
    : applicants;

  if (loading) return <Loader label="Fetching job candidate applications..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Job Applicants</h1>
          <p className="text-slate-500 text-sm">Review candidate profiles, cover letters, and update recruitment statuses</p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="">All Statuses ({applicants.length})</option>
            <option value="APPLIED">Applied</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW">Interview</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {filteredApplicants.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-3">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-semibold text-slate-800">No Candidates Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {statusFilter
              ? `No applicants currently match status '${statusFilter}'.`
              : 'No candidates have applied to your active job listings yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplicants.map((applicant) => (
            <ApplicantCard
              key={applicant._id}
              application={applicant}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
