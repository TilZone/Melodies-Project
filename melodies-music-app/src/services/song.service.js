import axiosInstance from './axiosInstance';
import { processApiResponse, handleApiError } from './apiUtils';

export const fetchSongs = async () => {
  try {
    const response = await axiosInstance.get('/songs');
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, 'fetching songs');
  }
};

export const fetchSongById = async (id) => {
  if (!id) throw new Error('Song ID is required');
  try {
    const response = await axiosInstance.get(`/songs/${id}`);
    return processApiResponse(response);
  } catch (error) {
    handleApiError(error, `fetching song ${id}`);
  }
};

export const fetchNewReleases = async () => {
  try {
    const response = await axiosInstance.get('/songs/discover/new-releases');
    const data = processApiResponse(response);
    return data;
  } catch (error) {
    handleApiError(error, 'fetching new releases');
  }
};
