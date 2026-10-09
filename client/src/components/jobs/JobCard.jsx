import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Calendar, DollarSign, Globe, Briefcase } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const JobCard = ({ job, isEmployer = false, onStatusChange, onDelete }) => {
  const {
    _id,
    title,
    companyId,
    location,
    remote,
    type,
    salary,
    skills = [],
    deadline,
    status,
    createdAt,
  } = job;

  const companyName = companyId?.name || 'Company';
  const companyLogo = companyId?.logoUrl;

  const typeBadges = {
    INTERNSHIP: 'bg-blue-50 text-blue-700 border-blue-200',
    FULL_TIME: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PART_TIME: 'bg-amber-50 text-amber-700 border-amber-200',
    CONTRACT: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const statusBadges = {
    ACTIVE: 'bg-emerald-100 text-emerald-800',
    CLOSED: 'bg-slate-200 text-slate-700',
    PENDING: 'bg-amber-100 text-amber-800',
    DRAFT: 'bg-slate-100 text-slate-600',
    REJECTED: 'bg-rose-100 text-rose-800',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="w-10 h-10 rounded-lg object-cover border border-slate-100"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                <Building className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-brand-600 transition">
                <Link to={`/jobs/${_id}`}>{title}</Link>
              </h3>
              <p className="text-xs font-semibold text-slate-500">{companyName}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                typeBadges[type] || 'bg-slate-50 text-slate-600'
              }`}
            >
              {type?.replace('_', ' ')}
            </span>
            {isEmployer && status && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadges[status]}`}>
                {status}
              </span>
            )}
          </div>
        </div>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{location}</span>
          </div>

          {remote && (
            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Remote</span>
            </div>
          )}

          {salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" />
              <span>{salary}</span>
            </div>
          )}

          {deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Apply by {formatDate(deadline)}</span>
            </div>
          )}
        </div>

        {/* Skills Tags */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.slice(0, 5).map((skill, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-md"
              >
                {skill}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="text-[11px] text-slate-400 font-medium px-1">+ {skills.length - 5} more</span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-2">
        <span className="text-[11px] text-slate-400 font-medium">
          Posted {formatDate(createdAt)}
        </span>

        {isEmployer ? (
          <div className="flex items-center gap-2">
            <Link
              to={`/employer/jobs/${_id}/edit`}
              className="text-xs font-semibold text-slate-700 hover:text-brand-600 px-2.5 py-1 bg-slate-100 rounded-md transition"
            >
              Edit
            </Link>
            {onStatusChange && (
              <button
                onClick={() => onStatusChange(_id, status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md transition ${
                  status === 'ACTIVE'
                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {status === 'ACTIVE' ? 'Close' : 'Reopen'}
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(_id)}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded-md transition"
              >
                Delete
              </button>
            )}
          </div>
        ) : (
          <Link
            to={`/jobs/${_id}`}
            className="text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-1.5 rounded-lg transition shadow-sm"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};
