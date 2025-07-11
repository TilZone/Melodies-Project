const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB using the connection string from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
