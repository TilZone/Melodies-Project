import axiosInstance from './axiosInstance';
import { unwrapApiData, handleApiError } from './apiUtils';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error);
  }
};
