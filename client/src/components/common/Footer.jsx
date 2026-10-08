import React from 'react';
import { Briefcase } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <Briefcase className="w-5 h-5 text-brand-500" />
          <span>InternHub</span>
        </div>

        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} InternHub platform. Built with production-quality MERN architecture.
        </p>
      </div>
    </footer>
  );
};
