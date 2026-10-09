import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { Loader } from '../../components/common/Loader';
import { Users, Search, Shield, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getUsers({ search, role: roleFilter });
      setUsers(res.data?.results || []);
    } catch (err) {
      // Handle gracefully
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const handleToggleStatus = async (userId, currentIsActive) => {
    try {
      await adminService.updateUserStatus(userId, !currentIsActive);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Failed to update user status');
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage User Accounts</h1>
          <p className="text-slate-400 text-sm">View registered students and employers, suspend or activate accounts</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white focus:outline-none"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-white focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="EMPLOYER">Employers</option>
            <option value="ADMIN">Admins</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader label="Loading user accounts..." />
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 border-b border-slate-700 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Registered</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-700/30 transition">
                  <td className="p-4 font-semibold text-white">
                    <div>{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-brand-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{formatDate(u.createdAt)}</td>
                  <td className="p-4">
                    {u.isActive ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Suspended</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {u.role !== 'ADMIN' && (
                      <button
                        onClick={() => handleToggleStatus(u._id, u.isActive)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          u.isActive
                            ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {u.isActive ? 'Suspend' : 'Activate'}
                      </button>
                    )}
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
