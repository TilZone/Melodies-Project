import axiosInstance from './axiosInstance';

// API response structure constants
const API_RESPONSE_STRUCTURE = {
  SUCCESS: 'success',
  MESSAGE: 'message',
  DATA: 'data',
};

// Error handling utility
const handleApiError = (error, operation) => {
  const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
  console.error(`Error ${operation}:`, errorMessage);
  throw new Error(errorMessage);
};

// Data transformation utilities
const transformMongoId = (item) => {
  if (!item || !item._id) return item;
  return { ...item, id: item._id.toString() };
};

const transformSongData = (song) => {
  const transformedSong = transformMongoId(song);
  
  if (transformedSong.artist) {
    transformedSong.artist = transformMongoId(transformedSong.artist);
  }
  
  if (transformedSong.album) {
    transformedSong.album = transformMongoId(transformedSong.album);
  }
  
  return transformedSong;
};

const transformArtistData = (artist) => {
  const transformedArtist = transformMongoId(artist);
  
  if (transformedArtist.topSongs) {
    transformedArtist.topSongs = transformedArtist.topSongs.map(transformSongData);
  }
  
  if (transformedArtist.albums) {
    transformedArtist.albums = transformedArtist.albums.map(transformAlbumData);
  }
  
  return transformedArtist;
};

const transformAlbumData = (album) => {
  const transformedAlbum = transformMongoId(album);
  
  if (transformedAlbum.artist) {
    transformedAlbum.artist = transformMongoId(transformedAlbum.artist);
  }
  
  return transformedAlbum;
};

// API response processor
const processApiResponse = (response, transformFunction = transformMongoId) => {
  const { data } = response;
  
  // Handle new API response structure
  if (data && typeof data === 'object' && data[API_RESPONSE_STRUCTURE.SUCCESS] !== undefined) {
    return data[API_RESPONSE_STRUCTURE.DATA]?.map(transformFunction) || [];
  }
  
  // Handle legacy response structure
  return Array.isArray(data) ? data.map(transformFunction) : transformFunction(data);
};

// Song API functions
export const fetchSongs = async () => {
  try {
    const response = await axiosInstance.get('/songs');
    return processApiResponse(response, transformSongData);
  } catch (error) {
    handleApiError(error, 'fetching songs');
  }
};

export const fetchSongById = async (id) => {
  if (!id) {
    throw new Error('Song ID is required');
  }
  
  try {
    const response = await axiosInstance.get(`/songs/${id}`);
    return processApiResponse(response, transformSongData);
  } catch (error) {
    handleApiError(error, `fetching song ${id}`);
  }
};

export const fetchTrendingSongs = async () => {
  try {
    const response = await axiosInstance.get('/songs/discover/trending');
    return processApiResponse(response, transformSongData);
  } catch (error) {
    handleApiError(error, 'fetching trending songs');
  }
};

export const fetchNewReleases = async () => {
  try {
    const response = await axiosInstance.get('/songs/discover/new-releases');
    return processApiResponse(response, transformSongData);
  } catch (error) {
    handleApiError(error, 'fetching new releases');
  }
};

// Artist API functions
export const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get('/artists');
    return processApiResponse(response, transformArtistData);
  } catch (error) {
    handleApiError(error, 'fetching artists');
  }
};

export const fetchArtistById = async (id) => {
  if (!id) {
    throw new Error('Artist ID is required');
  }
  
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return processApiResponse(response, transformArtistData);
  } catch (error) {
    handleApiError(error, `fetching artist ${id}`);
  }
};
