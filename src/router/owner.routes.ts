import { Router } from "express";
const router:Router = Router();
import { updateRoomAvailability } from '../controller/owner.controller';
import { checkSession } from "../utils/tokenManager";



router.post('/room/update', checkSession, updateRoomAvailability);

export default router;
