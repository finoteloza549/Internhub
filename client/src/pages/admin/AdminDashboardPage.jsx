import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { Loader } from '../../components/common/Loader';
import { Users, Building, Briefcase, Flag, CheckCircle2, FileText, Clock, Shield } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getStats();
        setStats(res.data || res);
      } catch (err) {
        // Handle gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader label="Loading platform statistics..." />;

  const {
    totalUsers = 0,
    totalStudents = 0,
    totalEmployers = 0,
    totalJobs = 0,
    activeJobs = 0,
    pendingJobApprovals = 0,
    totalApplications = 0,
    totalReports = 0,
  } = stats || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Platform Overview</h1>
        <p className="text-slate-400 text-sm">Monitor system users, job approvals, company verification, and reports</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Users</p>
            <p className="text-2xl font-bold text-white mt-1">{totalUsers}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{totalStudents} Students · {totalEmployers} Employers</p>
          </div>
          <Users className="w-8 h-8 text-brand-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Total Job Postings</p>
            <p className="text-2xl font-bold text-white mt-1">{totalJobs}</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">{activeJobs} Active</p>
          </div>
          <Briefcase className="w-8 h-8 text-emerald-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Pending Approvals</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingJobApprovals}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Require moderation</p>
          </div>
          <Clock className="w-8 h-8 text-amber-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase">Open Reports</p>
            <p className="text-2xl font-bold text-rose-400 mt-1">{totalReports}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Platform flags</p>
          </div>
          <Flag className="w-8 h-8 text-rose-400 bg-slate-700 p-1.5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
