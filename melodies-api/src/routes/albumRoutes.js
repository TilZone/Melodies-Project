import express from 'express';
import albumController from '../controllers/albumController.js';

const router = express.Router();

// Define routes
router.route('/').get(albumController.getAllAlbums).post(albumController.createAlbum);
router
  .route('/:id')
  .get(albumController.getAlbumById)
  .put(albumController.updateAlbum)
  .delete(albumController.deleteAlbum);

export default router;
