import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { Loader } from '../../components/common/Loader';
import { Flag, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const AdminReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await adminService.getReports();
      setReports(res.data?.results || []);
    } catch (err) {
      // Handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpdateStatus = async (reportId, status) => {
    try {
      await adminService.updateReportStatus(reportId, status);
      fetchReports();
    } catch (err) {
      alert(err.message || 'Failed to update report status');
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform Reports</h1>
        <p className="text-slate-400 text-sm">Review user-submitted flags against jobs, companies, or accounts</p>
      </div>

      {loading ? (
        <Loader label="Loading platform reports..." />
      ) : reports.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center text-slate-400">
          No reports filed yet.
        </div>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 border-b border-slate-700 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Target Type</th>
                <th className="p-4">Reason & Description</th>
                <th className="p-4">Reporter</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {reports.map((r) => (
                <tr key={r._id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4">
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300">
                      {r.targetType}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{r.reason}</div>
                    {r.description && <div className="text-slate-400 text-[11px] mt-0.5">{r.description}</div>}
                  </td>
                  <td className="p-4 text-slate-300">{r.reporterId?.email || 'N/A'}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-700 text-slate-300">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleUpdateStatus(r._id, 'RESOLVED')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold transition"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(r._id, 'DISMISSED')}
                        className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-xs font-semibold transition"
                      >
                        Dismiss
                      </button>
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
