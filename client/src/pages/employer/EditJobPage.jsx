import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jobService } from '../../services/job.service';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const editJobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'CONTRACT']),
  location: z.string().min(2, 'Location is required'),
  remote: z.boolean().default(false),
  skills: z.string().min(2, 'List required skills'),
  salary: z.string().optional(),
  deadline: z.string().min(1, 'Deadline date is required'),
  status: z.enum(['DRAFT', 'PENDING', 'ACTIVE', 'CLOSED', 'REJECTED']),
});

export const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editJobSchema),
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobService.getJobById(id);
        const job = res.data;
        reset({
          ...job,
          skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills,
          deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
        });
      } catch (err) {
        setServerError(err.message || 'Failed to fetch job posting');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const formattedSkills = data.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await jobService.updateJob(id, {
        ...data,
        skills: formattedSkills,
      });

      navigate('/employer/jobs', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Failed to update job posting');
    }
  };

  if (loading) return <Loader label="Loading job details..." />;

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
        <h1 className="text-2xl font-bold text-slate-900">Edit Opportunity</h1>
        <p className="text-slate-500 text-sm">Update the details of your job posting</p>
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
              Job Status
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="ACTIVE">Active</option>
              <option value="CLOSED">Closed</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.location && <p className="text-xs text-rose-600 mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Salary / Compensation
            </label>
            <input
              type="text"
              {...register('salary')}
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
            Job Description
          </label>
          <textarea
            rows={6}
            {...register('description')}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description.message}</p>}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="px-6 py-2.5 text-sm">
          Update Job Posting
        </Button>
      </form>
    </div>
  );
};
