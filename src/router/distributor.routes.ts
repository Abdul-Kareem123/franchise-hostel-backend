import { Router } from "express";
const router:Router = Router();
import { saveDistributor, getAllDistributors, updateDistributor, getSingleDistributor, saveBrand, getBrands } from "../controller/distributor.controller";
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
    checkRequestBodyParams('_id'),
    updateDistributor);

router.get('/singleDistributor', //get single distributor
    basicAuthUser,
    checkQuery('_id'),
    getSingleDistributor);

router.post('/saveBrand', //save brand
    basicAuthUser,
    checkRequestBodyParams('distributorId'),
    saveBrand);

router.get('/getBrands', //get brands
    basicAuthUser,
    getBrands);

export default router;