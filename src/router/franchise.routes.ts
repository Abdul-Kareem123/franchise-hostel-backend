import {Router} from "express";
const router:Router = Router();
import {saveFranchise} from "../controller/franchise.controller";
import {basicAuthUser} from "../middleware/checkAuth";
import {checkSession} from "../utils/tokenManager";
import { checkQuery,checkRequestBodyParams } from "../middleware/Validators";


router.post ('/', //save distributor
    basicAuthUser,
   checkRequestBodyParams('emailAddress'),
   checkRequestBodyParams('mobileNumber'),
   checkRequestBodyParams('productName'),
   saveFranchise
);


export default router;