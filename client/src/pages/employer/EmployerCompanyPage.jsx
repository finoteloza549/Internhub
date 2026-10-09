import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { companyService } from '../../services/company.service';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { Building2, Globe, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Invalid URL format').or(z.literal('')).optional(),
  location: z.string().min(2, 'Location is required'),
  logoUrl: z.string().url('Invalid URL format').or(z.literal('')).optional(),
  industry: z.string().min(2, 'Industry is required'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).default('1-10'),
});

export const EmployerCompanyPage = () => {
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await companyService.getCompanyById('my');
        if (res.data) {
          reset(res.data);
        }
      } catch (err) {
        // Ignore 404 if employer hasn't created profile yet
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [reset]);

  const onSubmit = async (data) => {
    setSuccessMsg(null);
    setServerError(null);
    try {
      await companyService.updateCompany('my', data);
      setSuccessMsg('Company profile updated successfully!');
    } catch (err) {
      setServerError(err.message || 'Failed to update company profile');
    }
  };

  if (loading) return <Loader label="Loading company profile details..." />;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company Profile</h1>
        <p className="text-slate-500 text-sm">Manage your organization details and branding for job applicants</p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {serverError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Company Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. Acme Tech Solutions"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Industry
            </label>
            <input
              type="text"
              {...register('industry')}
              placeholder="e.g. Software, Finance, Healthcare"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.industry && <p className="text-xs text-rose-600 mt-1">{errors.industry.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Headquarters Location
            </label>
            <input
              type="text"
              {...register('location')}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.location && <p className="text-xs text-rose-600 mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Company Size
            </label>
            <select
              {...register('companySize')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Website URL
            </label>
            <input
              type="url"
              {...register('website')}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.website && <p className="text-xs text-rose-600 mt-1">{errors.website.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Logo Image URL
            </label>
            <input
              type="url"
              {...register('logoUrl')}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.logoUrl && <p className="text-xs text-rose-600 mt-1">{errors.logoUrl.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Company Description
          </label>
          <textarea
            rows={4}
            {...register('description')}
            placeholder="Tell potential candidates about your organization, mission, culture, and achievements..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description.message}</p>}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="px-6 py-2.5 text-sm">
          Save Company Profile
        </Button>
      </form>
    </div>
  );
};
