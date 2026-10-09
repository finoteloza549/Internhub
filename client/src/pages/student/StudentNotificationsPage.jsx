import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notification.service';
import { NotificationList } from '../../components/common/NotificationList';
import { Loader } from '../../components/common/Loader';
import { Bell } from 'lucide-react';

export const StudentNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await notificationService.getNotifications();
      const data = res.data || res;
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      // Handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      // Handle
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      fetchNotifications();
    } catch (err) {
      // Handle
    }
  };

  if (loading) return <Loader label="Loading notifications..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
        <p className="text-slate-500 text-sm">
          {unreadCount > 0 ? `You have ${unreadCount} unread notification(s)` : 'All notifications read'}
        </p>
      </div>

      <NotificationList
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onMarkAllRead={unreadCount > 0 ? handleMarkAllRead : null}
      />
    </div>
  );
};
