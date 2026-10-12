import { Server } from 'socket.io';

let ioInstance = null;

/**
 * Initialize Socket.IO instance on the Node HTTP server
 */
export const initSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  ioInstance.on('connection', (socket) => {
    // Client joins their personal room based on authenticated userId
    socket.on('join_user_room', (userId) => {
      if (userId) {
        socket.join(userId);
      }
    });

    socket.on('disconnect', () => {
      // Clean disconnect
    });
  });

  return ioInstance;
};

/**
 * Emit a real-time notification to a specific user
 */
export const emitNotification = (userId, notification) => {
  if (ioInstance && userId) {
    ioInstance.to(userId.toString()).emit('new_notification', notification);
  }
};
