import React from 'react';
import { JobCard } from './JobCard';
import { Loader } from '../common/Loader';
import { Briefcase } from 'lucide-react';

export const JobList = ({
  jobs = [],
  loading = false,
  error = null,
  isEmployer = false,
  onStatusChange,
  onDelete,
}) => {
  if (loading) {
    return <Loader label="Searching active internship opportunities..." />;
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-xl text-center">
        <p className="font-semibold text-sm">{error}</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-3">
        <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-semibold text-slate-800">No Jobs Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          {isEmployer
            ? "You haven't posted any internship or job listings yet."
            : 'No jobs match your current search criteria. Try adjusting your filters or location.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          isEmployer={isEmployer}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
