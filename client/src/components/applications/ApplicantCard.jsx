import React, { useState } from 'react';
import { User, Mail, GraduationCap, Phone, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const ApplicantCard = ({ application, onStatusChange }) => {
  const { _id, studentId, jobId, status, appliedAt, coverLetter, cvUrl, studentProfile } = application;
  const [updating, setUpdating] = useState(false);

  const studentName = studentId?.name || 'Applicant';
  const studentEmail = studentId?.email || '';
  const jobTitle = jobId?.title || 'Job Posting';

  const university = studentProfile?.university || 'University N/A';
  const skills = studentProfile?.skills || [];
  const phone = studentProfile?.phone;
  const resolvedCvUrl = cvUrl || studentProfile?.cvUrl;

  const handleSelectChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await onStatusChange(_id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const statusColors = {
    APPLIED: 'bg-blue-50 text-blue-800 border-blue-200',
    REVIEWING: 'bg-amber-50 text-amber-800 border-amber-200',
    SHORTLISTED: 'bg-purple-50 text-purple-800 border-purple-200',
    INTERVIEW: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    ACCEPTED: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    REJECTED: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg shrink-0">
            <User className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug">{studentName}</h3>
            <p className="text-xs text-brand-600 font-semibold mt-0.5">Applied for: {jobTitle}</p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Status:
          </label>
          <select
            value={status}
            disabled={updating}
            onChange={handleSelectChange}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer transition ${
              statusColors[status] || 'bg-slate-50 text-slate-700'
            }`}
          >
            <option value="APPLIED">APPLIED</option>
            <option value="REVIEWING">REVIEWING</option>
            <option value="SHORTLISTED">SHORTLISTED</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {/* Details Bar */}
      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
        {studentEmail && (
          <div className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{studentEmail}</span>
          </div>
        )}

        {university && (
          <div className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>{university}</span>
          </div>
        )}

        {phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>{phone}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Applied {formatDate(appliedAt)}</span>
        </div>
      </div>

      {/* Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Cover Letter */}
      {coverLetter && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">Statement of Interest:</p>
          <p className="whitespace-pre-line leading-relaxed">"{coverLetter}"</p>
        </div>
      )}

      {/* CV Download / View Link */}
      {resolvedCvUrl && (
        <div className="pt-2 flex justify-end">
          <a
            href={resolvedCvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
          >
            <span>View Candidate Resume / CV</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
