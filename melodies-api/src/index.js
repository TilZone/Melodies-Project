// Entry point for Melodies API server
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Middleware configuration
app.use(express.json());
app.use(cors());

// Route imports
const songRoutes = require('./routes/songRoutes.js');
const artistRoutes = require('./routes/artistRoutes.js');
const albumRoutes = require('./routes/albumRoutes.js');

// API route registration
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/albums', albumRoutes);

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
