import Song from '../models/song.js';
import Artist from '../models/artist.js';
import Album from '../models/album.js';
import { successResponse, errorResponse } from '../utils/response.js';

const DEFAULT_PAGE_LIMIT = 20;
const DISCOVER_PAGE_LIMIT = 10;

/**
 * Creates a new song after validating artist and album existence.
 * @route POST /api/songs
 * @access Private (Admin)
 */
export const createSong = async (req, res) => {
  try {
    const { title, artist, album, duration, audioUrl, lyrics, genre, releaseDate } = req.body;

    if (!title || !artist || !duration || !audioUrl) {
      return errorResponse(res, 400, 'Title, artist, duration, and audioUrl are required.');
    }

    const artistExists = await Artist.findById(artist);
    if (!artistExists) {
      return errorResponse(res, 404, 'Artist not found.');
    }

    if (album) {
      const albumExists = await Album.findById(album);
      if (!albumExists) {
        return errorResponse(res, 404, 'Album not found.');
      }
    }

    const newSong = new Song({
      title,
      artist,
      album,
      duration,
      audioUrl,
      lyrics,
      genre,
      releaseDate,
    });

    const savedSong = await newSong.save();
    return successResponse(res, 201, savedSong, 'Song created successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while creating song: ${error.message}`);
  }
};

/**
 * Retrieves a paginated and filterable list of songs.
 * This function is designed to be flexible, serving various frontend needs from a single endpoint.
 * It supports filtering by genre, artist, or album, and sorting by release date (default) or popularity.
 * @route GET /api/songs
 * @access Public
 */
export const getAllSongs = async (req, res) => {
  try {
    const { page = 1, limit = DEFAULT_PAGE_LIMIT, genre, artistId, albumId, popular } = req.query;

    const query = {};
    if (genre) query.genre = genre;
    if (artistId) query.artist = artistId;
    if (albumId) query.album = albumId;

    const sort = popular ? { playCount: -1 } : { releaseDate: -1 };

    const songs = await Song.find(query)
      .populate('artist', 'name') // Populate artist name
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Song.countDocuments(query);

    const data = {
      items: songs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      totalItems: count,
    };

    return successResponse(res, 200, data);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting songs: ${error.message}`);
  }
};

/**
 * Retrieves a single song by its ID and increments its play count.
 * Incrementing playCount here is a simple strategy for tracking popularity.
 * @route GET /api/songs/:id
 * @access Public
 */
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist', 'name'); // Populate artist name

    if (!song) {
      return errorResponse(res, 404, 'Song not found');
    }

    // Increment play count
    song.playCount = (song.playCount || 0) + 1;
    await song.save();

    return successResponse(res, 200, song);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting song: ${error.message}`);
  }
};

/**
 * Updates a song's details.
 * @route PUT /api/songs/:id
 * @access Private (Admin)
 */
export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!song) {
      return errorResponse(res, 404, 'Song not found');
    }

    return successResponse(res, 200, song, 'Song updated successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while updating song: ${error.message}`);
  }
};

/**
 * Deletes a song from the database.
 * @route DELETE /api/songs/:id
 * @access Private (Admin)
 */
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return errorResponse(res, 404, 'Song not found');
    }

    // Future enhancement: Also remove the song from any albums or artist's song lists.

    return successResponse(res, 200, null, 'Song removed successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while deleting song: ${error.message}`);
  }
};

/**
 * Retrieves the top 10 most played (trending) songs.
 * This is a specialized endpoint for the Discover page.
 * @route GET /api/songs/discover/trending
 * @access Public
 */
export const getTrendingSongs = async (req, res) => {
  req.query.popular = true;
  req.query.limit = DISCOVER_PAGE_LIMIT;
  return getAllSongs(req, res);
};

/**
 * Retrieves the 10 newest released songs.
 * This is a specialized endpoint for the Discover page.
 * @route GET /api/songs/discover/new-releases
 * @access Public
 */
export const getNewReleases = async (req, res) => {
  req.query.limit = DISCOVER_PAGE_LIMIT;
  return getAllSongs(req, res);
};
