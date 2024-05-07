import { Router } from "express";
const router:Router = Router();
import { createFranchise, getAllFranchise, getFranchiseByDistributor, updateFranchise } from "../controller/franchise.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post ('/', //save distributor
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('distributorId'),
    createFranchise);

router.get('/',//get all franchise
    basicAuthUser,
    // checkSession,
    getAllFranchise);

router.get('/getFranchiseByDistributorId', //get Franchise by Distributor Id
    basicAuthUser,  
    checkSession, 
    checkQuery('distributorId'),
    getFranchiseByDistributor);

router.put('/', //update Franchise
    basicAuthUser,
    checkSession,
    updateFranchise);

export default router;