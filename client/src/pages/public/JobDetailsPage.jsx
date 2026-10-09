import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { useAuth } from '../../hooks/useAuth';
import {
  ArrowLeft,
  Building,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Briefcase,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await jobService.getJobById(id);
        setJob(res.data || res);
      } catch (err) {
        setError(err.message || 'Job posting not found');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <Loader label="Fetching job specifications..." fullPage />;
  if (error) return <ErrorMessage message={error} />;
  if (!job) return null;

  const company = job.companyId || {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Jobs</span>
      </Link>

      {/* Main Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xl shrink-0">
                <Building className="w-8 h-8" />
              </div>
            )}

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                {job.type?.replace('_', ' ')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {job.title}
              </h1>
              <p className="text-sm font-semibold text-slate-600">{company.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && user?.role === 'STUDENT' ? (
              <button
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition shadow-md text-sm"
                onClick={() => alert('Application submission workflow active in Phase 4!')}
              >
                Apply Now
              </button>
            ) : !isAuthenticated ? (
              <Link
                to="/login"
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition shadow-md text-sm text-center"
              >
                Log In to Apply
              </Link>
            ) : null}
          </div>
        </div>

        {/* Quick Details Pills */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{job.location}</span>
          </div>

          {job.remote && (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
              <Globe className="w-4 h-4" />
              <span>Remote Position</span>
            </div>
          )}

          {job.salary && (
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <span>{job.salary}</span>
            </div>
          )}

          {job.deadline && (
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Deadline: {formatDate(job.deadline)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {/* Skills Required */}
          {job.skills && job.skills.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Required Skills & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Company Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              About {company.name || 'Company'}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {company.description || 'No company description provided.'}
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-600">
              {company.industry && (
                <p>
                  <strong className="text-slate-800">Industry:</strong> {company.industry}
                </p>
              )}
              {company.companySize && (
                <p>
                  <strong className="text-slate-800">Company Size:</strong> {company.companySize} employees
                </p>
              )}
              {company.website && (
                <p>
                  <strong className="text-slate-800">Website:</strong>{' '}
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-600 hover:underline"
                  >
                    {company.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
