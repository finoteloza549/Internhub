import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, User, Building, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ROLES } from '../../utils/constants';

const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const user = await registerAuth({
        ...data,
        role: selectedRole,
      });

      switch (user.role) {
        case 'EMPLOYER':
          navigate('/employer/dashboard', { replace: true });
          break;
        case 'STUDENT':
        default:
          navigate('/student/dashboard', { replace: true });
          break;
      }
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    }
  };

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
            onClick={() => setSelectedRole(ROLES.STUDENT)}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              selectedRole === ROLES.STUDENT ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole(ROLES.EMPLOYER)}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              selectedRole === ROLES.EMPLOYER ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Employer</span>
          </button>
        </div>

        {serverError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                errors.name ? 'border-rose-300' : 'border-slate-200'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                  errors.email ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className={`w-full pl-9 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none ${
                  errors.password ? 'border-rose-300' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full py-3 text-sm font-semibold"
          >
            Create {selectedRole === ROLES.STUDENT ? 'Student' : 'Employer'} Account
          </Button>
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
