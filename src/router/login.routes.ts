import { Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from "../utils/tokenManager";
import { login,verifyOtpDistributor,verifyOtpFranchise } from '../controller/login.controller';

const router : Router = Router();

router.post ('/', //distributor login
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    login);

router.post ('/franchiseLogin',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    login);

router.post ('/verifyOtpDistributor',
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtpDistributor);

router.post ('/verifyOtpFranchise',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtpFranchise);

router.post ('/companyLogin',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    login);

    

export default router;
