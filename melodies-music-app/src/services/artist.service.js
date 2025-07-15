import axiosInstance from './axiosInstance';
import { processApiResponse, handleApiError } from './apiUtils';

export const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get('/artists');
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, 'fetching artists');
  }
};

export const fetchPopularArtists = async () => {
  try {
    const response = await axiosInstance.get('/artists?popular=true&limit=10');
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, 'fetching popular artists');
  }
};

export const fetchArtistById = async (id) => {
  if (!id) throw new Error('Artist ID is required');
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, `fetching artist ${id}`);
  }
};
