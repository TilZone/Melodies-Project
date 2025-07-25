import toast from 'react-hot-toast';

/**
 * API Utility Functions
 *
 * This module provides helper functions for handling API requests and responses
 * consistently across the application.
 */

/**
 * Handles errors from Axios requests in a standardized way.
 * It extracts the most specific error message available from the error object.
 *
 * @param {Error} error The error object caught from an Axios request.
 * @param {string} operation A descriptive name of the failed operation (e.g., 'fetching songs').
 * @throws {Error} Throws a new error with a clean, user-friendly message.
 */
export const handleApiError = (error, operation = 'operation') => {
  // Prioritize the backend's custom error message, if available.
  const errorMessage =
    error.response?.data?.message || error.message || 'An unknown error occurred.';

  console.error(`API Error during ${operation}:`, errorMessage);
  toast.error(`Error ${operation}: ${errorMessage}`);

  throw new Error(errorMessage);
};

/**
 * Unwraps the 'data' property from a standardized API response.
 * Our backend wraps all successful responses in a `{ success: true, data: ... }` object.
 * This function safely extracts the `data` payload.
 *
 * @param {object} response The Axios response object.
 * @returns {any} The actual data payload from the API.
 * @throws {Error} Throws an error if the response format is invalid or indicates a failure.
 */
export const unwrapApiData = (response) => {
  const { data } = response;

  if (data?.success) {
    if (data.message) {
      toast.success(data.message);
    }
    return data.data;
  }

  // If 'success' is false or the structure is unexpected, throw the message from the backend.
  const errorMessage = data?.message || 'The server returned an invalid response.';
  toast.error(errorMessage);
  throw new Error(errorMessage);
};
