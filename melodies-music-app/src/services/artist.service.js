/**
 * Artist Service
 *
 * This module provides functions for interacting with the artist-related endpoints of the API.
 */
import axiosInstance from './axiosInstance';
import { unwrapApiData, handleApiError } from './apiUtils';

/**
 * Fetches a list of all artists.
 * @returns {Promise<Array>} A promise that resolves to an array of artist objects.
 */
export const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get('/artists');

    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, 'fetching artists');
  }
};

/**
 * Fetches a list of popular artists for the Discover page.
 * @returns {Promise<Array>} A promise that resolves to an array of popular artist objects.
 */
export const fetchPopularArtists = async () => {
  try {
    // This endpoint is specifically designed for the discover page, fetching a limited list.
    const response = await axiosInstance.get('/artists/discover/popular');
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, 'fetching popular artists');
  }
};

/**
 * Fetches a single artist by their unique ID.
 * @param {string} id The unique identifier of the artist.
 * @returns {Promise<object>} A promise that resolves to the artist object.
 */
export const fetchArtistById = async (id) => {
  if (!id) throw new Error('Artist ID is required for fetching.');
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, `fetching artist ${id}`);
  }
};
