import axiosInstance from './axiosInstance';
import { handleApiError, unwrapApiData } from './apiUtils';

/**
 * Fetches a list of all albums.
 * @returns {Promise<Object>} A promise that resolves to the API response.
 */
export const fetchAlbums = async () => {
  try {
    const response = await axiosInstance.get('/albums');
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, 'fetching albums');
  }
};

/**
 * Fetches a single album by its ID.
 * @param {string} id The ID of the album to fetch.
 * @returns {Promise<Object>} A promise that resolves to the API response.
 */
export const fetchAlbumById = async (id) => {
  try {
    const response = await axiosInstance.get(`/albums/${id}`);
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, `fetching album ${id}`);
  }
};
