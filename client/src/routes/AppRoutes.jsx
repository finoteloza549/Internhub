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
import { StudentNotificationsPage } from '../pages/student/StudentNotificationsPage';

import { EmployerDashboardPage } from '../pages/employer/EmployerDashboardPage';
import { EmployerCompanyPage } from '../pages/employer/EmployerCompanyPage';
import { EmployerJobsPage } from '../pages/employer/EmployerJobsPage';
import { CreateJobPage } from '../pages/employer/CreateJobPage';
import { EditJobPage } from '../pages/employer/EditJobPage';
import { EmployerApplicantsPage } from '../pages/employer/EmployerApplicantsPage';

import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminCompaniesPage } from '../pages/admin/AdminCompaniesPage';
import { AdminJobsPage } from '../pages/admin/AdminJobsPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
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
          <Route path="/student/notifications" element={<StudentNotificationsPage />} />
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
          <Route path="/employer/applicants" element={<EmployerApplicantsPage />} />
        </Route>
      </Route>

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/companies" element={<AdminCompaniesPage />} />
          <Route path="/admin/jobs" element={<AdminJobsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Route>
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
