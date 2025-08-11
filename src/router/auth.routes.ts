import { Router } from "express";
const router:Router = Router();
import { registerOwner, loginOwner } from '../controller/auth.controller';
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "src/utils/tokenManager";


router.post('/register', basicAuthUser, registerOwner);
router.post('/login', basicAuthUser, loginOwner);

export default router;
