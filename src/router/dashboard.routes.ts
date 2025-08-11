import { Router } from 'express';
import { roomsPerFloor } from '../controller/dashboard.controller';
import { checkSession } from '../utils/tokenManager';

const router: Router = Router();

router.get('/rooms-per-floor', checkSession, roomsPerFloor);

export default router;
