import { Router } from "express";
const router:Router = Router();
import { loginOwner } from '../controller/ownerLogin.controller';
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";

router.post('/login', basicAuthUser, loginOwner);

export default router;
