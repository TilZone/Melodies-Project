const express = require('express');
const router = express.Router();
const Song = require('../models/song.js');

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

// Get all songs with artist and album details
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('artist').populate('album').sort({ createdAt: -1 });

    handleSuccess(res, songs, 'Songs retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching songs');
  }
});

// Get a song by its ID, including artist and album
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Song ID is required',
      });
    }

    const song = await Song.findById(id).populate('artist').populate('album');

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found',
      });
    }

    handleSuccess(res, song, 'Song retrieved successfully');
  } catch (error) {
    handleError(res, error, `Error fetching song ${req.params.id}`);
  }
});

// Get top 10 trending songs by play count
router.get('/discover/trending', async (req, res) => {
  try {
    const trendingSongs = await Song.find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate('artist')
      .populate('album');

    handleSuccess(res, trendingSongs, 'Trending songs retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching trending songs');
  }
});

// Get 10 newest song releases
router.get('/discover/new-releases', async (req, res) => {
  try {
    const newReleases = await Song.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('artist')
      .populate('album');

    handleSuccess(res, newReleases, 'New releases retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching new releases');
  }
});

module.exports = router;
