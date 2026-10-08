import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, User, Building, Mail, Lock, Shield } from 'lucide-react';
import { ROLES } from '../../utils/constants';

export const RegisterPage = () => {
  const [role, setRole] = useState(ROLES.STUDENT);

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 text-brand-600 rounded-xl mb-2">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500">Join InternHub to start discovering opportunities</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole(ROLES.STUDENT)}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              role === ROLES.STUDENT ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole(ROLES.EMPLOYER)}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              role === ROLES.EMPLOYER ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Employer</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition shadow-sm"
          >
            Create {role === ROLES.STUDENT ? 'Student' : 'Employer'} Account
          </button>
        </form>

        <p className="text-xs text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
