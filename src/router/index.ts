import {Router} from 'express';
const router : Router = Router();
 
import Distributor from './distributor.routes';
import Franchise from './franchise.routes';
import Login from './login.routes';
import Company from './company.routes';




router.use('/distributor',Distributor);
router.use('/franchise',Franchise);
router.use('/login',Login);
router.use('/company',Company);






export default router ;
