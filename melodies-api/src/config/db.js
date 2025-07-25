import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
  } catch (err) {
    console.error('Initial MongoDB connection error:', err.message);
    process.exit(1); // Exit process if initial connection fails
  }
};

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected to database.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination.');
  process.exit(0);
});

export default connectDB;
