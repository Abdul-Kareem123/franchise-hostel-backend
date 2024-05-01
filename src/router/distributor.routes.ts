import { Router } from "express";
const router:Router = Router();
import { createDistributor, getAllDistributors, updateDistributor, getSingleDistributor } from "../controller/distributor.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save distributor
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    createDistributor);

router.get('/', //get all distributor
    basicAuthUser,
    checkSession,
    getAllDistributors);

router.put('/', //update distributor
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateDistributor);

router.get('/singleDistributor', //get single distributor
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleDistributor);

export default router;