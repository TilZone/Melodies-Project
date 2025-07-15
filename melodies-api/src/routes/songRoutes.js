const express = require('express');
const router = express.Router();
const {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const Song = require('../models/song.js'); // Keep for custom routes

// Helper functions (can be moved to a middleware file later)
const handleError = (res, error, message = 'Internal server error') => {
  console.error(message, error);
  res.status(500).json({
    success: false,
    message: error.message || message,
  });
};

const handleSuccess = (res, data, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

// --- CRUD Routes using Controller ---
router.route('/').get(getAllSongs).post(createSong);
router.route('/:id').get(getSongById).put(updateSong).delete(deleteSong);

// --- Custom Discover Routes ---

// Get top 10 trending songs by play count
router.get('/discover/trending', async (req, res) => {
  try {
    const trendingSongs = await Song.find()
      .sort({ playCount: -1 })
      .limit(10)
      .populate('artist', 'name imageUrl')
      .populate('album', 'title');

    handleSuccess(res, trendingSongs, 'Trending songs retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching trending songs');
  }
});

// Get 10 newest song releases
router.get('/discover/new-releases', async (req, res) => {
  try {
    const newReleases = await Song.find()
      .sort({ releaseDate: -1 }) // Use releaseDate for more accuracy
      .limit(10)
      .populate('artist', 'name imageUrl')
      .populate('album', 'title');

    handleSuccess(res, newReleases, 'New releases retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Error fetching new releases');
  }
});

module.exports = router;
