import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { Loader } from '../../components/common/Loader';
import { Building, ShieldCheck, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const AdminCompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await adminService.getCompanies();
      setCompanies(res.data?.results || []);
    } catch (err) {
      // Handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleToggleVerification = async (companyId, currentIsVerified) => {
    try {
      await adminService.updateCompanyVerification(companyId, !currentIsVerified);
      fetchCompanies();
    } catch (err) {
      alert(err.message || 'Failed to update company verification status');
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold text-white">Manage Companies</h1>
        <p className="text-slate-400 text-sm">Verify corporate organization profiles and review employer entities</p>
      </div>

      {loading ? (
        <Loader label="Loading company profiles..." />
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 border-b border-slate-700 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Company</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Location</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {companies.map((c) => (
                <tr key={c._id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4 font-semibold text-white">{c.name}</td>
                  <td className="p-4 text-slate-300">{c.industry}</td>
                  <td className="p-4 text-slate-400">{c.location}</td>
                  <td className="p-4 text-slate-400">{c.ownerId?.email || 'N/A'}</td>
                  <td className="p-4">
                    {c.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Unverified</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleVerification(c._id, c.isVerified)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition ${
                        c.isVerified
                          ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                    >
                      {c.isVerified ? 'Revoke Verification' : 'Verify Profile'}
                    </button>
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
