import { Router } from "express";
const router:Router = Router();
import { createBrand, getBrands, getBrandsByDistributor, updateBrand, deleteBrand, getSingleBrand, updateBrandAmount, coinsDeduction } from "../controller/brand.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //create brand
    basicAuthUser,
    // checkSession,
    checkRequestBodyParams('distributorId'),
    createBrand);

router.get('/', //get brands
    basicAuthUser,
    getBrands);

router.get('/getSingleBrand',
    basicAuthUser,
    checkQuery('_id'),
    getSingleBrand);

router.get('/getBrandsByDistributorId', //get brands by Distributor Id
    basicAuthUser, 
    checkQuery('distributorId'), 
    getBrandsByDistributor);

router.put('/', //update brand
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateBrand);

router.put('/updateBrandAmount', //update brand
        basicAuthUser,
        //checkSession,
        checkRequestBodyParams('_id'),
        updateBrandAmount);

router.delete('/', //delete brand
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteBrand);

 

router.put('/Coins', //update brand
    basicAuthUser,
    //checkSession,
    checkRequestBodyParams('_id'),
    coinsDeduction);   

export default router;