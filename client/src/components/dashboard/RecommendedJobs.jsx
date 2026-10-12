import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/job.service';
import { Sparkles, Building, MapPin, ArrowRight } from 'lucide-react';

export const RecommendedJobs = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await jobService.getRecommendedJobs();
        setRecommendedJobs(res.data || []);
      } catch (err) {
        // Handle gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  if (loading || recommendedJobs.length === 0) return null;

  const getMatchBadgeStyle = (pct) => {
    if (pct >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (pct >= 70) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-600" />
        <h2 className="text-lg font-bold text-slate-900">Recommended for Your Profile</h2>
        <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-full border border-brand-200">
          AI Skill Match
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedJobs.map((job) => {
          const company = job.companyId || {};
          const matchPct = job.matchPercentage || 50;

          return (
            <div
              key={job._id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="w-9 h-9 rounded-lg object-cover border border-slate-100 shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <Building className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm hover:text-brand-600 transition line-clamp-1">
                        <Link to={`/jobs/${job._id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-500">{company.name}</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${getMatchBadgeStyle(
                      matchPct
                    )}`}
                  >
                    {matchPct}% Match
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </div>

                {job.matchingSkills && job.matchingSkills.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1">
                    {job.matchingSkills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">{job.salary || 'Competitive'}</span>
                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
