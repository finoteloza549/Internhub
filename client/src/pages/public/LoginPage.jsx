import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, Lock, Mail, AlertCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const user = await login(data);
      const from = location.state?.from?.pathname;
      
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      switch (user.role) {
        case 'ADMIN':
          navigate('/admin/dashboard', { replace: true });
          break;
        case 'EMPLOYER':
          navigate('/employer/dashboard', { replace: true });
          break;
        case 'STUDENT':
        default:
          navigate('/student/dashboard', { replace: true });
          break;
      }
    } catch (err) {
      setServerError(err.message || 'Invalid email address or password');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 text-brand-600 rounded-xl mb-2">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">Sign in to your InternHub account</p>
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
            Sign In
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};
