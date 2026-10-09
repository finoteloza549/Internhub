import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jobService } from '../../services/job.service';
import { Button } from '../../components/common/Button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { JOB_TYPES, JOB_STATUS } from '../../utils/constants';

const createJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'CONTRACT']).default('INTERNSHIP'),
  location: z.string().min(2, 'Location is required'),
  remote: z.boolean().default(false),
  skills: z.string().min(2, 'Please list required skills (comma-separated)'),
  salary: z.string().optional().default('Competitive'),
  deadline: z.string().min(1, 'Deadline date is required'),
  status: z.enum(['DRAFT', 'PENDING', 'ACTIVE', 'CLOSED']).default('ACTIVE'),
});

export const CreateJobPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      type: JOB_TYPES.INTERNSHIP,
      status: JOB_STATUS.ACTIVE,
      remote: false,
      salary: 'Competitive',
    },
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const formattedSkills = data.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await jobService.createJob({
        ...data,
        skills: formattedSkills,
      });

      navigate('/employer/jobs', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Failed to create job posting');
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        to="/employer/jobs"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Jobs</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Post a New Opportunity</h1>
        <p className="text-slate-500 text-sm">Create an internship or job posting to attract qualified candidates</p>
      </div>

      {serverError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Job Title
            </label>
            <input
              type="text"
              {...register('title')}
              placeholder="e.g. Frontend Software Engineering Intern"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Opportunity Type
            </label>
            <select
              {...register('type')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="INTERNSHIP">Internship</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              placeholder="e.g. New York, NY or Remote"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.location && <p className="text-xs text-rose-600 mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Compensation / Salary
            </label>
            <input
              type="text"
              {...register('salary')}
              placeholder="e.g. $30/hr or $2,500/mo"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              {...register('deadline')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.deadline && <p className="text-xs text-rose-600 mt-1">{errors.deadline.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              {...register('skills')}
              placeholder="React, Node.js, JavaScript, Tailwind CSS"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.skills && <p className="text-xs text-rose-600 mt-1">{errors.skills.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('remote')}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-sm font-medium text-slate-700">Remote Position Available</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Job & Responsibilities Description
          </label>
          <textarea
            rows={6}
            {...register('description')}
            placeholder="Detailed description of the role, responsibilities, qualifications, and learning outcomes..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description.message}</p>}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="px-6 py-2.5 text-sm">
          Publish Job Posting
        </Button>
      </form>
    </div>
  );
};
