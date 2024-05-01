import { Router } from "express";
const router:Router = Router();
import { createBrand, getBrands, getBrandsByDistributor, updateBrand, deleteBrand } from "../controller/brand.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save brand
    basicAuthUser,
    checkRequestBodyParams('distributorId'),
    createBrand);

router.get('/', //get brands
    basicAuthUser,
    getBrands);

router.get('/getBrandsByDistributorId', //get brands by Distributor Id
    basicAuthUser, 
    checkQuery('distributorId'), 
    getBrandsByDistributor);

router.put('/', //update brand
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateBrand);

router.delete('/', //delete brand
    basicAuthUser,
    checkQuery('_id'),
    deleteBrand);

export default router;