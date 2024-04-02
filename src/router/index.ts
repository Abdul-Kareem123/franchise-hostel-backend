import {Router} from 'express';
const router : Router = Router();
 
import Distributor from './distributor.routes';
import Franchise from './franchise.routes';
import Login from './login.routes';
import Company from './company.routes';
import Product from './product.routes'



router.use('/distributor',Distributor);
router.use('/franchise',Franchise);
router.use('/login',Login);
router.use('/company',Company);
router.use('/product',Product);





export default router ;
