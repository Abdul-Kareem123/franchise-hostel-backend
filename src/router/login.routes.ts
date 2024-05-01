import { Router} from 'express';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from "../utils/tokenManager";
import { login,verifyOtp } from '../controller/login.controller';

const router : Router = Router();

router.post ('/', //distributor login
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('mobileNumber'),
    login);

router.post ('/verifyOtp',
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    checkRequestBodyParams('otp'),
    verifyOtp);

    
export default router;
