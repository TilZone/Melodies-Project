/**
 * Song Service
 *
 * This module provides functions for interacting with the song-related endpoints of the API.
 */
import axiosInstance from './axiosInstance';
import { unwrapApiData, handleApiError } from './apiUtils';

/**
 * Fetches a list of all songs.
 * @returns {Promise<Array>} A promise that resolves to an array of song objects.
 */
export const fetchSongs = async () => {
  try {
    const response = await axiosInstance.get('/songs');
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, 'fetching songs');
  }
};

/**
 * Fetches a single song by its unique ID.
 * @param {string} id The unique identifier of the song.
 * @returns {Promise<object>} A promise that resolves to the song object.
 */
export const fetchSongById = async (id) => {
  if (!id) throw new Error('Song ID is required for fetching.');
  try {
    const response = await axiosInstance.get(`/songs/${id}`);
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, `fetching song ${id}`);
  }
};

/**
 * Fetches the list of new release songs for the Discover page.
 * @returns {Promise<Array>} A promise that resolves to an array of new release song objects.
 */
export const fetchNewReleases = async () => {
  try {
    const response = await axiosInstance.get('/songs/discover/new-releases');
    return unwrapApiData(response);
  } catch (error) {
    handleApiError(error, 'fetching new releases');
  }
};
