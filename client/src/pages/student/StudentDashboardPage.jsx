import React from 'react';
import { FileText, Eye, CheckCircle2, Bookmark } from 'lucide-react';

export const StudentDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 text-sm">Overview of your job applications and saved listings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Applications</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <FileText className="w-8 h-8 text-brand-600 bg-brand-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Under Review</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <Eye className="w-8 h-8 text-amber-600 bg-amber-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Accepted</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-600 bg-emerald-50 p-1.5 rounded-lg" />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Saved Jobs</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">0</p>
          </div>
          <Bookmark className="w-8 h-8 text-purple-600 bg-purple-50 p-1.5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
