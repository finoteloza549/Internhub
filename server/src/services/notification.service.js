import { Notification } from '../models/Notification.js';
import { ApiError } from '../utils/ApiError.js';

export const notificationService = {
  /**
   * Create a notification record
   */
  createNotification: async ({ userId, title, message, type = 'SYSTEM', link = '' }) => {
    try {
      const notification = await Notification.create({
        userId,
        title,
        message,
        type,
        link,
      });
      return notification;
    } catch (error) {
      console.error(`[Notification System Error] Failed to create notification: ${error.message}`);
    }
  },

  /**
   * Get all notifications for a specific user
   */
  getUserNotifications: async (userId) => {
    const [notifications, unreadCount] = await Promise.all([
      Notification.find({ userId }).sort({ createdAt: -1 }).limit(50),
      Notification.countDocuments({ userId, isRead: false }),
    ]);

    return {
      notifications,
      unreadCount,
    };
  },

  /**
   * Mark a single notification as read
   */
  markAsRead: async (notificationId, userId) => {
    const notification = await Notification.findOne({ _id: notificationId, userId });
    if (!notification) {
      throw new ApiError(404, 'Notification record not found');
    }

    notification.isRead = true;
    await notification.save();

    return notification;
  },

  /**
   * Mark all notifications for user as read
   */
  markAllAsRead: async (userId) => {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    return { success: true };
  },
};
