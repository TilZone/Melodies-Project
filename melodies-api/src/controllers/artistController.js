const Artist = require('../models/artist');
const { successResponse, errorResponse } = require('../utils/response');

// @desc    Create a new artist
// @route   POST /api/artists
// @access  Private (Admin)
const createArtist = async (req, res) => {
  try {
    const { name, bio, imageUrl, genres } = req.body;

    if (!name) {
      return errorResponse(res, 400, 'Artist name is required.');
    }

    const artistExists = await Artist.findOne({ name });
    if (artistExists) {
      return errorResponse(res, 400, 'Artist with this name already exists.');
    }

    const newArtist = new Artist({ name, bio, imageUrl, genres });
    const savedArtist = await newArtist.save();
    return successResponse(res, 201, savedArtist, 'Artist created successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while creating artist: ${error.message}`);
  }
};

// @desc    Get all artists with filtering and pagination
// @route   GET /api/artists
// @access  Public
const getAllArtists = async (req, res) => {
  try {
    const { page = 1, limit = 20, popular } = req.query;

    let sort = { name: 1 };
    if (popular) {
      sort = { monthlyListeners: -1 };
    }

    const artists = await Artist.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Artist.countDocuments();

    const data = {
      items: artists,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      totalItems: count,
    };

    return successResponse(res, 200, data);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting artists: ${error.message}`);
  }
};

// @desc    Get a single artist by ID with their songs and albums
// @route   GET /api/artists/:id
// @access  Public
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('topSongs').populate('albums');

    if (!artist) {
      return errorResponse(res, 404, 'Artist not found');
    }

    return successResponse(res, 200, artist);
  } catch (error) {
    return errorResponse(res, 500, `Server error while getting artist: ${error.message}`);
  }
};

// @desc    Update an artist
// @route   PUT /api/artists/:id
// @access  Private (Admin)
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      return errorResponse(res, 404, 'Artist not found');
    }
    return successResponse(res, 200, artist, 'Artist updated successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while updating artist: ${error.message}`);
  }
};

// @desc    Delete an artist
// @route   DELETE /api/artists/:id
// @access  Private (Admin)
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return errorResponse(res, 404, 'Artist not found');
    }

    // Optional: Decide what to do with songs by this artist.
    // await Song.updateMany({ artist: req.params.id }, { $unset: { artist: 1 } });

    return successResponse(res, 200, null, 'Artist removed successfully.');
  } catch (error) {
    return errorResponse(res, 500, `Server error while deleting artist: ${error.message}`);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
