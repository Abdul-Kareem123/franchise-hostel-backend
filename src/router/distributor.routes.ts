import { Router } from "express";
const router:Router = Router();
import { saveDistributor, getAllDistributors, updateDistributor } from "../controller/distributor.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save distributor
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    saveDistributor);

router.get('/', //get all distributor
    basicAuthUser,
    getAllDistributors);

router.put('/', //update distributor
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateDistributor);

export default router;