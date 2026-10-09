import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from './Loader';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullPage label="Authenticating session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect user to their own role's primary dashboard if unauthorized for this route
    switch (user?.role) {
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      case 'EMPLOYER':
        return <Navigate to="/employer/dashboard" replace />;
      case 'STUDENT':
      default:
        return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <Outlet />;
};
