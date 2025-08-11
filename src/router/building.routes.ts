import { Router } from "express";
const router:Router = Router();
import { getAllBuildings } from '../controller/building.controller';
import { basicAuthUser } from "../middleware/checkAuth";


router.get('/',basicAuthUser, getAllBuildings);

export default router;
