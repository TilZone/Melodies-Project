const express = require('express');
const router = express.Router();
const {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/albumController');

// Define routes
router.route('/').get(getAllAlbums).post(createAlbum);
router.route('/:id').get(getAlbumById).put(updateAlbum).delete(deleteAlbum);

module.exports = router;
