import { Router } from "express";
const router:Router = Router();
import { deleteOwnerById, getAllOwnerData, getOwnerById, registerOwner, updatedOwner, updateRoomAvailability } from '../controller/owner.controller';
import { checkSession } from "../utils/tokenManager";
import { basicAuthUser } from "../middleware/checkAuth";
import { Admin } from "src/models/admin.model";


router.post('/register', basicAuthUser, registerOwner);
router.post('/room/update', basicAuthUser, checkSession(['owner']), updateRoomAvailability);
router.get('/:id', basicAuthUser, checkSession(), getOwnerById);
router.get('/', basicAuthUser, checkSession(['owner']), getAllOwnerData);
router.put('/:id', basicAuthUser, checkSession(["owner", "admin"]), updatedOwner);
router.delete('/:id', basicAuthUser, checkSession(['admin', "owner"]), deleteOwnerById);

export default router;
