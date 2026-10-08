import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';

export const JobDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Jobs</span>
      </Link>

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4 text-center">
        <Briefcase className="w-12 h-12 text-brand-600 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900">Job Specification Details</h1>
        <p className="text-sm text-slate-500">Job ID: {id}</p>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Full job description, required skills, company info, and direct application submission workflow will be connected in Phase 3 & 4.
        </p>
      </div>
    </div>
  );
};
