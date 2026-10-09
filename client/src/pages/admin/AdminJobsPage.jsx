import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { Loader } from '../../components/common/Loader';
import { Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const AdminJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await adminService.getJobs();
      setJobs(res.data?.results || []);
    } catch (err) {
      // Handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApproval = async (jobId, status) => {
    try {
      await adminService.updateJobApproval(jobId, status);
      fetchJobs();
    } catch (err) {
      alert(err.message || 'Failed to update job approval status');
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold text-white">Job Posting Moderation</h1>
        <p className="text-slate-400 text-sm">Approve, reject, or close internship and job listings across the platform</p>
      </div>

      {loading ? (
        <Loader label="Loading job postings..." />
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 border-b border-slate-700 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Posted By</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {jobs.map((j) => (
                <tr key={j._id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4 font-semibold text-white">
                    {j.title}
                    <div className="text-[11px] text-slate-400 font-normal">{j.location} · {j.type}</div>
                  </td>
                  <td className="p-4 text-slate-300">{j.companyId?.name || 'Company'}</td>
                  <td className="p-4 text-slate-400">{j.postedBy?.email || 'N/A'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        j.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : j.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {j.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {j.status !== 'ACTIVE' && (
                        <button
                          onClick={() => handleApproval(j._id, 'ACTIVE')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition"
                        >
                          Approve
                        </button>
                      )}
                      {j.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleApproval(j._id, 'REJECTED')}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold transition"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
