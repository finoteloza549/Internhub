import React from 'react';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

export const EmployerDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Employer Dashboard</h1>
        <p className="text-slate-500 text-sm">Manage your company listings, jobs, and applicants</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Jobs</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <Briefcase className="w-8 h-8 text-brand-600 bg-brand-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Active Postings</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Applicants</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <Users className="w-8 h-8 text-purple-600 bg-purple-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Pending Review</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <Clock className="w-8 h-8 text-amber-600 bg-amber-50 p-1.5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
