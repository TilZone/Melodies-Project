const express = require('express');
const router = express.Router();
const {
  createArtist,
  getAllArtists,
  updateArtist,
  deleteArtist,
} = require('../controllers/artistController');
const Artist = require('../models/artist.js');
const Song = require('../models/song.js');
const Album = require('../models/album.js');

// Helper functions
const handleError = (res, error, message = 'Internal server error') => {
  console.error(message, error);
  res.status(500).json({ success: false, message: error.message || message });
};

const handleSuccess = (res, data, message = 'Success') => {
  res.status(200).json({ success: true, message, data });
};

// --- Routes using Controller for general purpose ---
router.route('/').get(getAllArtists).post(createArtist);
router.route('/:id').put(updateArtist).delete(deleteArtist);

// --- Custom Route for getting a single artist with detailed data ---
// This route is kept separate to include specific logic like fetching top songs.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'Artist ID is required' });
    }

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found' });
    }

    // Fetch related data in parallel for better performance
    const [topSongs, albums] = await Promise.all([
      Song.find({ artist: artist._id })
        .sort({ playCount: -1 })
        .limit(10)
        .populate('album', 'title coverArt'),
      Album.find({ artist: artist._id }).sort({ releaseYear: -1 }),
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
