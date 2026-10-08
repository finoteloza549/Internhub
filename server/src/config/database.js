import mongoose from 'mongoose';

/**
 * Connect to MongoDB instance using Mongoose
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/internhub';
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB: ${error.message}`);
    console.warn('[Database Notice] The API server will continue running. Ensure MongoDB is running or MONGO_URI is configured in server/.env.');
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[Database Warning] MongoDB connection lost.');
});

mongoose.connection.on('error', (err) => {
  console.error(`[Database Error] Mongoose runtime error: ${err.message}`);
});
