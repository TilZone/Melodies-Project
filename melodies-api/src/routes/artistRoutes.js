const express = require('express');
const router = express.Router();
const Artist = require('../models/artist.js');
const Song = require('../models/song.js');
const Album = require('../models/album.js');

// Helper function for consistent error responses
const handleError = (res, error, message = 'Internal server error') => {
  console.error(message, error);
  res.status(500).json({
    success: false,
    message: error.message || message,
  });
};

// Helper function for consistent success responses
const handleSuccess = (res, data, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().sort({ name: 1 });
    handleSuccess(res, artists, 'Artists retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching artists');
  }
});

// Get artist by ID with their songs and albums
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Artist ID is required',
      });
    }

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    // Fetch related data in parallel for better performance
    const [topSongs, albums] = await Promise.all([
      Song.find({ artist: artist._id }).sort({ playCount: -1 }).limit(5).populate('artist'),
      Album.find({ artist: artist._id }).populate('artist'),
    ]);

    const artistData = {
      ...artist.toObject(),
      topSongs,
      albums,
    };

    handleSuccess(res, artistData, 'Artist details retrieved successfully');
  } catch (error) {
    handleError(res, error, `Error fetching artist ${req.params.id}`);
  }
});

module.exports = router;
