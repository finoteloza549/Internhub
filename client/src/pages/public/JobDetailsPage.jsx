import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { applicationService } from '../../services/application.service';
import { userService } from '../../services/user.service';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import {
  ArrowLeft,
  Building,
  MapPin,
  Globe,
  DollarSign,
  Calendar,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  // Apply Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [applySubmitting, setApplySubmitting] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await jobService.getJobById(id);
        setJob(res.data || res);

        // Check if student has saved this job
        if (isAuthenticated && user?.role === 'STUDENT') {
          try {
            const savedRes = await userService.getSavedJobs();
            const savedList = savedRes.data || [];
            setIsSaved(savedList.some((j) => (j._id || j) === id));
          } catch (e) {
            // Ignore
          }
        }
      } catch (err) {
        setError(err.message || 'Job posting not found');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, isAuthenticated, user]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSavingJob(true);
    try {
      if (isSaved) {
        await jobService.unsaveJob(id);
        setIsSaved(false);
      } else {
        await jobService.saveJob(id);
        setIsSaved(true);
      }
    } catch (err) {
      alert(err.message || 'Failed to update saved job status');
    } finally {
      setSavingJob(false);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplySubmitting(true);
    setApplyError(null);
    try {
      await applicationService.applyForJob({
        jobId: id,
        coverLetter,
        cvUrl,
      });

      setApplySuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setApplySuccess(false);
      }, 2000);
    } catch (err) {
      setApplyError(err.message || 'Failed to submit application');
    } finally {
      setApplySubmitting(false);
    }
  };

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

      {/* Header Card */}
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
            {isAuthenticated && user?.role === 'STUDENT' && (
              <button
                onClick={handleToggleSave}
                disabled={savingJob}
                className={`p-3 rounded-xl border transition ${
                  isSaved
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                title={isSaved ? 'Remove Bookmark' : 'Save Job Bookmark'}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}

            {isAuthenticated && user?.role === 'STUDENT' ? (
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition shadow-md text-sm"
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Job Description</h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </div>
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Required Skills & Qualifications</h2>
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

        {/* Company Sidebar */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Application Submission Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 relative">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900">Apply for {job.title}</h3>
            <p className="text-xs text-slate-500">Submitting application to {company.name}</p>

            {applySuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Application submitted successfully! Redirecting...</span>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
                {applyError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{applyError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Cover Letter / Statement of Interest
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Introduce yourself and explain why you're a great fit for this role..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    CV / Resume Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={cvUrl}
                    onChange={(e) => setCvUrl(e.target.value)}
                    placeholder="https://example.com/my-resume.pdf"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>

                  <Button type="submit" isLoading={applySubmitting} className="px-5 py-2 text-xs font-semibold">
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
