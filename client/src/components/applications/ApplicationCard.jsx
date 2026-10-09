import React from 'react';
import { Link } from 'react-router-dom';
import { ApplicationStatus } from './ApplicationStatus';
import { Building, MapPin, Calendar, FileText } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const ApplicationCard = ({ application }) => {
  const { _id, jobId, status, appliedAt, coverLetter } = application;
  const job = jobId || {};
  const company = job.companyId || {};

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shrink-0">
              <Building className="w-6 h-6" />
            </div>
          )}

          <div>
            <h3 className="font-bold text-slate-900 text-base hover:text-brand-600 transition">
              <Link to={`/jobs/${job._id}`}>{job.title || 'Job Posting'}</Link>
            </h3>
            <p className="text-xs font-semibold text-slate-500">{company.name || 'Company'}</p>
          </div>
        </div>

        <ApplicationStatus status={status} />
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
        {job.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.location}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Applied on {formatDate(appliedAt)}</span>
        </div>
      </div>

      {coverLetter && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 italic">
          <p className="line-clamp-2">"{coverLetter}"</p>
        </div>
      )}
    </div>
  );
};
