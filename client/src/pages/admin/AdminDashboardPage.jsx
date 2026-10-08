import React from 'react';
import { Users, Building, Briefcase, Flag } from 'lucide-react';

export const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Platform Overview</h1>
        <p className="text-slate-400 text-sm">Monitor user activity, job approvals, and platform moderation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Users</p>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <Users className="w-8 h-8 text-brand-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Companies</p>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <Building className="w-8 h-8 text-emerald-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Pending Approvals</p>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <Briefcase className="w-8 h-8 text-amber-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Open Reports</p>
            <p className="text-2xl font-bold text-white mt-1">0</p>
          </div>
          <Flag className="w-8 h-8 text-rose-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
