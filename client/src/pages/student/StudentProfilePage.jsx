import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userService } from '../../services/user.service';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { User, Phone, MapPin, GraduationCap, FileText, CheckCircle2, AlertCircle, Upload, ExternalLink } from 'lucide-react';

export const StudentProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadedCvUrl, setUploadedCvUrl] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getCurrentProfile();
        if (res.data) {
          const profile = res.data;
          setUploadedCvUrl(profile.cvUrl || '');
          reset({
            ...profile,
            skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills,
          });
        }
      } catch (err) {
        setServerError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCv(true);
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await userService.uploadCv(formData);
      const fileUrl = res.data?.fileUrl;
      if (fileUrl) {
        setUploadedCvUrl(fileUrl);
        setValue('cvUrl', fileUrl);
        setSuccessMsg('Resume / CV uploaded and attached to profile successfully!');
      }
    } catch (err) {
      setServerError(err.message || 'Failed to upload document');
    } finally {
      setUploadingCv(false);
    }
  };

  const onSubmit = async (data) => {
    setSuccessMsg(null);
    setServerError(null);
    try {
      const formattedSkills = typeof data.skills === 'string'
        ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : data.skills;

      await userService.updateProfile({
        ...data,
        cvUrl: uploadedCvUrl || data.cvUrl,
        skills: formattedSkills,
      });

      setSuccessMsg('Student profile updated successfully!');
    } catch (err) {
      setServerError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <Loader label="Loading student profile details..." />;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
        <p className="text-slate-500 text-sm">Manage your education, skills, bio, and resume details</p>
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
              Phone Number
            </label>
            <input
              type="text"
              {...register('phone')}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              placeholder="City, State"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              University / Institution
            </label>
            <input
              type="text"
              {...register('university')}
              placeholder="e.g. Stanford University"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              {...register('skills')}
              placeholder="React, JavaScript, Python, SQL, Git"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* File Upload Section */}
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Resume / CV Document
                </h4>
                <p className="text-xs text-slate-500">Upload your PDF or Word document (Max 10MB)</p>
              </div>

              <label className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer inline-flex items-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploadingCv ? 'Uploading...' : 'Upload File'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={uploadingCv}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedCvUrl && (
              <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg text-xs text-slate-700">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="truncate">{uploadedCvUrl}</span>
                </div>
                <a
                  href={uploadedCvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-600 hover:underline font-semibold shrink-0 ml-2 inline-flex items-center gap-1"
                >
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Short Bio
          </label>
          <textarea
            rows={4}
            {...register('bio')}
            placeholder="Write a brief introduction about your career goals, background, and major..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <Button type="submit" isLoading={isSubmitting} className="px-6 py-2.5 text-sm">
          Save Profile
        </Button>
      </form>
    </div>
  );
};
