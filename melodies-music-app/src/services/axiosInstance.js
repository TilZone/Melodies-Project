/**
 * Axios Instance Configuration
 *
 * This module exports a pre-configured instance of Axios.
 * It sets the base URL for all API requests, pointing to the backend server.
 * The base URL is read from environment variables (VITE_API_BASE_URL) for flexibility
 * across different environments (development, staging, production), with a fallback
 * for local development.
 *
 * Using a single, centralized instance simplifies API calls, token management,
 * and error handling across the application.
 */
import axios from 'axios';

// The base URL for the backend API.
// It's best practice to use environment variables for this.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
