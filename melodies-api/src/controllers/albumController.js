import Album from '../models/album.js';
import Artist from '../models/artist.js';
import { successResponse, errorResponse } from '../utils/response.js';

// @desc    Create a new album
// @route   POST /api/albums
// @access  Private (Admin)
const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseDate, coverArt, genre } = req.body;

    if (!title || !artist || !releaseDate) {
      return errorResponse(res, 400, 'Title, artist, and releaseDate are required.');
    }

    const artistExists = await Artist.findById(artist);
    if (!artistExists) {
      return errorResponse(res, 404, 'Artist not found.');
    }

    const newAlbum = new Album({ title, artist, releaseDate, coverArt, genre });
    const savedAlbum = await newAlbum.save();
    return successResponse(res, 201, savedAlbum, 'Album created successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while creating album: ${error.message}`);
  }
};

// @desc    Get all albums
// @route   GET /api/albums
// @access  Public
const getAllAlbums = async (req, res) => {
  try {
    const { page = 1, limit = 20, artistId } = req.query;
    let query = {};
    if (artistId) {
      query.artist = artistId;
    }

    const albums = await Album.find(query)
      .populate('artist', 'name')
      .sort({ releaseDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Album.countDocuments(query);

    const data = {
      items: albums,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      totalItems: count,
    };

    return successResponse(res, 200, data);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting albums: ${error.message}`);
  }
};

// @desc    Get a single album by ID with its songs
// @route   GET /api/albums/:id
// @access  Public
const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate('artist', 'name imageUrl')
      .populate({
        path: 'songs',
        populate: { path: 'artist', select: 'name' },
      });

    if (!album) {
      return errorResponse(res, 404, 'Album not found');
    }
    return successResponse(res, 200, album);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting album: ${error.message}`);
  }
};

// @desc    Update an album
// @route   PUT /api/albums/:id
// @access  Private (Admin)
const updateAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!album) {
      return errorResponse(res, 404, 'Album not found');
    }
    return successResponse(res, 200, album, 'Album updated successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while updating album: ${error.message}`);
  }
};

// @desc    Delete an album
// @route   DELETE /api/albums/:id
// @access  Private (Admin)
const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return errorResponse(res, 404, 'Album not found');
    }
    // Optional: Also delete all songs in this album
    // await Song.deleteMany({ album: req.params.id });
    return successResponse(res, 200, null, 'Album removed successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while deleting album: ${error.message}`);
  }
};

export default {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};
