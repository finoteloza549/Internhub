import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Building, GraduationCap, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
          <Zap className="w-3.5 h-3.5 text-brand-600" />
          <span>Launch Your Professional Career</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Discover Premium <span className="text-brand-600">Internships & Entry-Level</span> Careers
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          InternHub connects ambitious students with top-tier companies. Explore verified roles, track your application pipeline, and start your journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/jobs"
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse All Internships</span>
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Create Student Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Role Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-brand-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Students</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find internships tailored to your major, build your portfolio, and track your application status in real-time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Employers</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Post internship listings, review qualified applicants, and streamline candidate interviewing effortlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Verified Platform</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every job posting and company profile is moderated by platform admins for authenticity and safety.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
