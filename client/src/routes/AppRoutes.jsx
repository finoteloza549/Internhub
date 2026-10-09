import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { EmployerLayout } from '../layouts/EmployerLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';

import { HomePage } from '../pages/public/HomePage';
import { JobsPage } from '../pages/public/JobsPage';
import { JobDetailsPage } from '../pages/public/JobDetailsPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';

import { StudentDashboardPage } from '../pages/student/StudentDashboardPage';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';
import { StudentApplicationsPage } from '../pages/student/StudentApplicationsPage';
import { StudentSavedJobsPage } from '../pages/student/StudentSavedJobsPage';

import { EmployerDashboardPage } from '../pages/employer/EmployerDashboardPage';
import { EmployerCompanyPage } from '../pages/employer/EmployerCompanyPage';
import { EmployerJobsPage } from '../pages/employer/EmployerJobsPage';
import { CreateJobPage } from '../pages/employer/CreateJobPage';
import { EditJobPage } from '../pages/employer/EditJobPage';

import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { ROLES } from '../utils/constants';

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
      <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}>
        <Route element={<StudentLayout />}>
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/jobs" element={<Navigate to="/jobs" replace />} />
          <Route path="/student/saved" element={<StudentSavedJobsPage />} />
          <Route path="/student/applications" element={<StudentApplicationsPage />} />
          <Route path="/student/notifications" element={<div className="p-4 bg-white rounded-xl">Notifications Center Placeholder</div>} />
        </Route>
      </Route>

      {/* Employer Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYER]} />}>
        <Route element={<EmployerLayout />}>
          <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
          <Route path="/employer/company" element={<EmployerCompanyPage />} />
          <Route path="/employer/jobs" element={<EmployerJobsPage />} />
          <Route path="/employer/jobs/create" element={<CreateJobPage />} />
          <Route path="/employer/jobs/:id/edit" element={<EditJobPage />} />
          <Route path="/employer/applicants" element={<div className="p-4 bg-white rounded-xl">Review Job Applicants Placeholder</div>} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<div className="p-4 bg-slate-800 rounded-xl">User Accounts Management Placeholder</div>} />
          <Route path="/admin/companies" element={<div className="p-4 bg-slate-800 rounded-xl">Company Verification Management Placeholder</div>} />
          <Route path="/admin/jobs" element={<div className="p-4 bg-slate-800 rounded-xl">Job Approvals Console Placeholder</div>} />
          <Route path="/admin/reports" element={<div className="p-4 bg-slate-800 rounded-xl">Platform Reports & Moderation Placeholder</div>} />
        </Route>
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
