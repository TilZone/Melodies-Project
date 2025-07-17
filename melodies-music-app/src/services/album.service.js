import axiosInstance from './axiosInstance';
import { processApiResponse, handleApiError } from './apiUtils';

export const fetchAlbumById = async (id) => {
  if (!id) throw new Error('Album ID is required');
  try {
    const response = await axiosInstance.get(`/albums/${id}`);
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, `fetching album ${id}`);
  }
};
