import { Router } from "express";
const router:Router = Router();
import { saveDistributor, updateDistributor } from "../controller/distributor.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";


router.post('/', //save distributor
    basicAuthUser,
    checkRequestBodyParams('emailAddress'),
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('productName'),
    saveDistributor);

router.put('/', //update distributor
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateDistributor);


export default router;