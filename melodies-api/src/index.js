// Entry point for Melodies API server
import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';

// Route imports
import songRoutes from './routes/songRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import albumRoutes from './routes/albumRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
// dotenv/config đã tự động load

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleware configuration
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// CORS configuration
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    console.log('CORS Origin received:', origin); // Log the received origin
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error('CORS: Origin not allowed', origin); // Log blocked origin
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// API route registration
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Melodies API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Global error handling middleware
app.use((err, req, res, _next) => {
  console.error('Server error:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Melodies API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/`);
});
