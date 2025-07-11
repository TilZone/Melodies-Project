import axios from 'axios';

// Base URL for backend API
const BASE_URL = 'http://localhost:3000/api';

// Create a pre-configured axios instance for API requests
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
