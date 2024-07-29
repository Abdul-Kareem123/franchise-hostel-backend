
import {Router} from 'express';
import {payPlan,verifyPayment} from '../controller/payment.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/payment', // create product
    basicAuthUser,
    checkSession,
    payPlan
);  

router.get('/verifyPayment', // get all product
    basicAuthUser,
    checkSession,
    verifyPayment
);

export default router;