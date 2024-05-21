import { Router } from "express";
const router:Router = Router();
import { createFranchiser, getAllFranchisers, updateFranchiser, getSingleFranchiser, deleteFranchiser  } from "../controller/franchiser.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save franchiser
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    createFranchiser);

router.get('/', //get all franchisers
    basicAuthUser,
    checkSession,
    getAllFranchisers);

router.put('/', //update franchiser
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateFranchiser);

router.get('/singleFranchiser', //get single distributor
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleFranchiser);

router.delete('/', //delete franchiser
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteFranchiser
)

export default router;