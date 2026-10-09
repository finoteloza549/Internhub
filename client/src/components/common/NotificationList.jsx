import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, FileText, CheckCheck, Info } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const NotificationList = ({ notifications = [], onMarkRead, onMarkAllRead }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-3">
        <Bell className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-semibold text-slate-800">No Notifications</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          You're all caught up! You will be notified here when application statuses update or new matches occur.
        </p>
      </div>
    );
  }

  const getIcon = (type) => {
    switch (type) {
      case 'STATUS_CHANGE':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'APPLICATION_SUBMITTED':
        return <FileText className="w-5 h-5 text-brand-600" />;
      case 'JOB_APPROVAL':
        return <CheckCheck className="w-5 h-5 text-purple-600" />;
      case 'SYSTEM':
      default:
        return <Info className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {onMarkAllRead && (
        <div className="flex justify-end">
          <button
            onClick={onMarkAllRead}
            className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        </div>
      )}

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item._id}
            onClick={() => !item.isRead && onMarkRead && onMarkRead(item._id)}
            className={`p-4 rounded-xl border transition flex items-start gap-3.5 cursor-pointer ${
              item.isRead
                ? 'bg-white border-slate-200'
                : 'bg-brand-50/50 border-brand-200 shadow-sm'
            }`}
          >
            <div className="p-2 rounded-lg bg-white border border-slate-100 shrink-0 shadow-2xs">
              {getIcon(item.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <span className="text-[11px] text-slate-400 font-medium shrink-0">
                  {formatDate(item.createdAt)}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>

              {item.link && (
                <Link
                  to={item.link}
                  className="inline-block text-xs font-semibold text-brand-600 hover:underline mt-2"
                >
                  View Details &rarr;
                </Link>
              )}
            </div>

            {!item.isRead && (
              <span className="w-2.5 h-2.5 bg-brand-600 rounded-full shrink-0 mt-1.5" title="Unread" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
