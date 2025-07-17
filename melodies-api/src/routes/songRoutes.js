import express from 'express';
import songController from '../controllers/songController.js';

const router = express.Router();

// --- Discover Routes ---
router.get('/discover/trending', songController.getTrendingSongs);
router.get('/discover/new-releases', songController.getNewReleases);

// --- CRUD Routes ---
router.route('/').get(songController.getAllSongs).post(songController.createSong);
router
  .route('/:id')
  .get(songController.getSongById)
  .put(songController.updateSong)
  .delete(songController.deleteSong);

export default router;
