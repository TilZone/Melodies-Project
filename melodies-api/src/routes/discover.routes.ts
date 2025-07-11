import { Router } from 'express';
import { getFeatured, getNewReleases, getTopCharts } from '../controllers/discover.controller';

const router = Router();

router.get('/featured', getFeatured);
router.get('/new-releases', getNewReleases);
router.get('/top-charts', getTopCharts);

export default router;