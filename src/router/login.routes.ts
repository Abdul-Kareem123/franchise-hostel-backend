import { Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { login,verifyOtpDistributor,verifyOtpFranchise } from '../controller/login.controller';

const router : Router = Router();

router.post ('/distributorLogin',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    login);

router.post ('/franchiseLogin',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    login);

router.post ('/verifyOtpDistributor',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtpDistributor);

router.post ('/verifyOtpFranchise',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtpFranchise);
    

export default router;
