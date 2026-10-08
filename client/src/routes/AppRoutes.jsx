import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { EmployerLayout } from '../layouts/EmployerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { HomePage } from '../pages/public/HomePage';
import { JobsPage } from '../pages/public/JobsPage';
import { JobDetailsPage } from '../pages/public/JobDetailsPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';

import { StudentDashboardPage } from '../pages/student/StudentDashboardPage';
import { EmployerDashboardPage } from '../pages/employer/EmployerDashboardPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Student Protected Routes */}
      <Route element={<StudentLayout />}>
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/profile" element={<div className="p-4 bg-white rounded-xl">Student Profile Placeholder</div>} />
        <Route path="/student/jobs" element={<Navigate to="/jobs" replace />} />
        <Route path="/student/saved" element={<div className="p-4 bg-white rounded-xl">Saved Jobs Placeholder</div>} />
        <Route path="/student/applications" element={<div className="p-4 bg-white rounded-xl">Student Applications Placeholder</div>} />
        <Route path="/student/notifications" element={<div className="p-4 bg-white rounded-xl">Notifications Placeholder</div>} />
      </Route>

      {/* Employer Protected Routes */}
      <Route element={<EmployerLayout />}>
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
        <Route path="/employer/company" element={<div className="p-4 bg-white rounded-xl">Company Profile Placeholder</div>} />
        <Route path="/employer/jobs" element={<div className="p-4 bg-white rounded-xl">Employer Job Management Placeholder</div>} />
        <Route path="/employer/jobs/create" element={<div className="p-4 bg-white rounded-xl">Create Job Posting Placeholder</div>} />
        <Route path="/employer/applicants" element={<div className="p-4 bg-white rounded-xl">Applicants Management Placeholder</div>} />
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<div className="p-4 bg-slate-800 rounded-xl">Manage Users Placeholder</div>} />
        <Route path="/admin/companies" element={<div className="p-4 bg-slate-800 rounded-xl">Manage Companies Placeholder</div>} />
        <Route path="/admin/jobs" element={<div className="p-4 bg-slate-800 rounded-xl">Manage Jobs Approval Placeholder</div>} />
        <Route path="/admin/reports" element={<div className="p-4 bg-slate-800 rounded-xl">Platform Reports Placeholder</div>} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
