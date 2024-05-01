import { Router } from "express";
const router:Router = Router();
import { createFranchise } from "../controller/franchise.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post ('/', //save distributor
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('distributorId'),
    createFranchise);

export default router;