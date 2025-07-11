import { Router } from 'express';
import { getSongDetails } from '../controllers/song.controller';

const router = Router();
router.get('/:songId', getSongDetails);
export default router;