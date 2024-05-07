import { Router } from "express";
const router:Router = Router();
import { createBrand, getBrands, getBrandsByDistributor, updateBrand, deleteBrand, getSingleBrand } from "../controller/brand.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save brand
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('distributorId'),
    createBrand);

router.get('/', //get brands
    basicAuthUser,
    getBrands);

router.get('/getSingleBrand',
    basicAuthUser,
    checkQuery('_id'),
    getSingleBrand
)

router.get('/getBrandsByDistributorId', //get brands by Distributor Id
    basicAuthUser, 
    checkSession,
    checkQuery('distributorId'), 
    getBrandsByDistributor);

router.put('/', //update brand
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateBrand);

router.delete('/', //delete brand
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteBrand);

export default router;