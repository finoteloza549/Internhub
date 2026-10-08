import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Briefcase, LogOut, User, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'EMPLOYER':
        return '/employer/dashboard';
      case 'STUDENT':
      default:
        return '/student/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-600">
          <Briefcase className="w-6 h-6 text-brand-600" />
          <span>InternHub</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/jobs" className="text-slate-600 hover:text-brand-600 font-medium text-sm transition">
            Explore Jobs
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-brand-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                <span className="text-sm font-semibold text-slate-800">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-brand-600 px-3 py-2 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
