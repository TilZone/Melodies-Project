// melodies-api/src/routes/albumRoutes.js
const express = require('express');
const router = express.Router();
const Album = require('../models/album.js');

// GET all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find().populate('artist');
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET album by ID
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    if (!album) return res.status(404).json({ message: 'Album not found' });
    res.json(album);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
