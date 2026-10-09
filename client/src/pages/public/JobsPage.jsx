import React, { useState, useEffect, useCallback } from 'react';
import { jobService } from '../../services/job.service';
import { JobFilters } from '../../components/jobs/JobFilters';
import { JobList } from '../../components/jobs/JobList';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    remote: '',
    page: 1,
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobService.getJobs(filters);
      const data = res.data || res;
      setJobs(data.results || []);
      setPagination({
        currentPage: data.currentPage || 1,
        totalPages: data.totalPages || 1,
        totalResults: data.totalResults || 0,
      });
    } catch (err) {
      setError(err.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      type: '',
      remote: '',
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Internships & Jobs
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          {pagination.totalResults} active opportunities found across verified companies
        </p>
      </div>

      <JobFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />

      <JobList jobs={jobs} loading={loading} error={error} />

      {/* Pagination Controls */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold text-slate-500">
            Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalResults} results)
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
