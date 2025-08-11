import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkAvailability, getAllAvailableRooms } from '../controller/room.controller';

const router:Router = Router();

router.get('/availability', basicAuthUser, checkAvailability);
router.get('/allAvailableRooms', basicAuthUser, getAllAvailableRooms);
export default router;
