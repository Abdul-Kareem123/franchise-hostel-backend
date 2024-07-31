import { Router } from "express";
const router:Router = Router();
import { createFranchise, getAllFranchise, getSingleFranchise, getFranchiseByDistributor, updateFranchise, deleteFranchise } from "../controller/franchise.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post ('/', //create franchise
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('distributorId'),
    createFranchise);

router.get('/allfranchise', //get all franchise
    basicAuthUser,
    getAllFranchise);

router.get('/getSingleFranchise',
    basicAuthUser,
    checkQuery('_id'),
    getSingleFranchise);

router.get('/getFranchiseByFranchiserId', //get Franchise by Franchiser Id
    basicAuthUser,   
    checkQuery('distributorId'),
    getFranchiseByDistributor);

router.put('/', //update Franchise
    basicAuthUser,
    checkSession,
    updateFranchise);

router.delete('/', //delete Franchise
    basicAuthUser,
    checkSession,
    deleteFranchise);

export default router;
