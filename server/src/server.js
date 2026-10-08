import dotenv from 'dotenv';
// Load environment variables before any other imports
dotenv.config();

import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 5000;

// Start Server after Database Connection
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`[Server] InternHub backend listening on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`[Unhandled Rejection] Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error(`[Uncaught Exception] Error: ${err.message}`);
    process.exit(1);
  });
};

startServer();
