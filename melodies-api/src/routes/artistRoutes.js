import express from 'express';
import artistController from '../controllers/artistController.js';

const router = express.Router();

// Routes are now fully handled by the controller
router.route('/').get(artistController.getAllArtists).post(artistController.createArtist);

router
  .route('/:id')
  .get(artistController.getArtistById)
  .put(artistController.updateArtist)
  .delete(artistController.deleteArtist);

export default router;
