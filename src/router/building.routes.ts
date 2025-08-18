import { Router } from "express";
const router:Router = Router();
import { getAllBuildings, 
         getBuildingById, 
         updateBuilding, 
         deleteBuildingById, 
         deleteMultipleBuildings } from '../controller/building.controller';
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";


router.get('/',basicAuthUser, checkSession(), getAllBuildings);
router.get('/:id', basicAuthUser, checkSession(), getBuildingById);
router.put('/:id', basicAuthUser, checkSession(['owner', 'admin']), updateBuilding);
router.delete('/:id', basicAuthUser, checkSession(['owner', 'admin']), deleteBuildingById);
router.delete('/', basicAuthUser, checkSession(['admin']), deleteMultipleBuildings);
export default router;
