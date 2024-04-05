import {Router} from "express";
const router:Router = Router();
import {getAllDistributor, saveDistributor, getSingleDistributor} from "../controller/distributor.controller";
import {basicAuthUser} from "../middleware/checkAuth";
import {checkSession} from "../utils/tokenManager";
import { checkQuery,checkRequestBodyParams } from "../middleware/Validators";


router.post ('/', //save distributor
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('productName'),
    saveDistributor
);

router.get('/singleDistributor',//get single distributor
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
   getSingleDistributor
);

router.get('/', //get all Distributor
   basicAuthUser,
   checkSession,
   getAllDistributor
);


export default router;