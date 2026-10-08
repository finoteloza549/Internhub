import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LayoutDashboard, Building2, Briefcase, PlusCircle, Users } from 'lucide-react';

export const EmployerLayout = () => {
  const navItems = [
    { to: '/employer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/employer/company', label: 'Company Profile', icon: Building2 },
    { to: '/employer/jobs', label: 'Manage Jobs', icon: Briefcase },
    { to: '/employer/jobs/create', label: 'Post New Job', icon: PlusCircle },
    { to: '/employer/applicants', label: 'Applicants', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
              Employer Portal
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
