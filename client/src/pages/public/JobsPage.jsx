import React from 'react';
import { Search, MapPin, Filter, Briefcase } from 'lucide-react';

export const JobsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Explore Internships & Jobs</h1>
        <p className="text-slate-600 text-sm mt-1">
          Search hundreds of active opportunities across top companies
        </p>
      </div>

      {/* Search & Filter Bar Placeholder */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, skill, or keyword..."
            className="bg-transparent text-sm text-slate-800 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-full md:w-64">
          <MapPin className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Location or Remote"
            className="bg-transparent text-sm text-slate-800 focus:outline-none w-full"
          />
        </div>

        <button className="w-full md:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg text-sm transition">
          Search
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-800">Job System Initialized</h3>
        <p className="text-sm mt-1 max-w-md mx-auto">
          Job listings and filters will be fully populated when company and job services are enabled in Phase 3.
        </p>
      </div>
    </div>
  );
};
