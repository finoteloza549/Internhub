import React from 'react';
import { Search, MapPin, Filter, RotateCcw } from 'lucide-react';
import { JOB_TYPES } from '../../utils/constants';

export const JobFilters = ({ filters, onFilterChange, onReset }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value, page: 1 });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Keyword */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => handleInputChange('search', e.target.value)}
              placeholder="Title, skill, technology..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filters.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State, or Remote"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Job Type
          </label>
          <select
            value={filters.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="">All Job Types</option>
            <option value={JOB_TYPES.INTERNSHIP}>Internship</option>
            <option value={JOB_TYPES.FULL_TIME}>Full Time</option>
            <option value={JOB_TYPES.PART_TIME}>Part Time</option>
            <option value={JOB_TYPES.CONTRACT}>Contract</option>
          </select>
        </div>

        {/* Remote Checkbox & Reset Button */}
        <div className="flex items-end justify-between gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 pb-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.remote === 'true' || filters.remote === true}
              onChange={(e) => handleInputChange('remote', e.target.checked ? 'true' : '')}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span>Remote Only</span>
          </label>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 pb-2.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
