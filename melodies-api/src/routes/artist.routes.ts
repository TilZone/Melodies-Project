import { Router } from 'express';
import { getArtistDetails, getSongsByArtist } from '../controllers/artist.controller';

const router = Router();
router.get('/:artistId', getArtistDetails);
router.get('/:artistId/songs', getSongsByArtist);
export default router;