import Song from '../models/song.js';
import Artist from '../models/artist.js';
import Album from '../models/album.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    Create a new song
// @route   POST /api/songs
// @access  Private (Admin)
const createSong = async (req, res) => {
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

// @desc    Get all songs with filtering and pagination
// @route   GET /api/songs
// @access  Public
const getAllSongs = async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, artistId, albumId, popular } = req.query;

    let query = {};
    if (genre) query.genre = genre;
    if (artistId) query.artist = artistId;
    if (albumId) query.album = albumId;

    let sort = { releaseDate: -1 };
    if (popular) {
      sort = { playCount: -1 };
    }

    const songs = await Song.find(query)
      .populate('artist', 'name imageUrl')
      .populate('album', 'title coverArt')
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

// @desc    Get a single song by ID
// @route   GET /api/songs/:id
// @access  Public
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist').populate('album');

    if (!song) {
      return errorResponse(res, 404, 'Song not found');
    }

    song.playCount += 1;
    await song.save();

    return successResponse(res, 200, song);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting song: ${error.message}`);
  }
};

// @desc    Update a song
// @route   PUT /api/songs/:id
// @access  Private (Admin)
const updateSong = async (req, res) => {
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

// @desc    Delete a song
// @route   DELETE /api/songs/:id
// @access  Private (Admin)
const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return errorResponse(res, 404, 'Song not found');
    }

    return successResponse(res, 200, null, 'Song removed successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while deleting song: ${error.message}`);
  }
};

// @desc    Get top 10 trending songs by play count
// @route   GET /api/songs/discover/trending
// @access  Public
const getTrendingSongs = async (req, res) => {
  try {
    const trendingSongs = await Song.find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate('artist', 'name imageUrl')
      .populate('album', 'title');
    return successResponse(res, 200, trendingSongs, 'Trending songs retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, `Server error while fetching trending songs: ${error.message}`);
  }
};

// @desc    Get 10 newest song releases
// @route   GET /api/songs/discover/new-releases
// @access  Public
const getNewReleases = async (req, res) => {
  try {
    const newReleases = await Song.find()
      .sort({ releaseDate: -1 })
      .limit(10)
      .populate('artist', 'name imageUrl')
      .populate('album', 'title coverArt');

    const data = {
      items: newReleases,
      totalPages: 1, // Assuming no pagination for fixed limit 10
      currentPage: 1,
      totalItems: newReleases.length,
    };
    return successResponse(res, 200, data, 'New releases retrieved successfully');
  } catch (error) {
    return errorResponse(res, 500, `Server error while fetching new releases: ${error.message}`);
  }
};

export default {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
  getTrendingSongs,
  getNewReleases,
};
