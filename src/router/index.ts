import {Router} from 'express';
const router : Router = Router();
 
import Distributor from './distributor.routes';
import Franchise from './franchise.routes';
import Login from './login.routes';
import Product from './product.routes';
import ContactUs from './contactUs.routes';
import Category from './category.routes';
import Brand from './brand.routes'
import Franchiser from './franchiser.routes'
import User from './user.routes'
import Proposal from './proposal.routes'
import payment from './payment.routes';

router.use('/distributor',Distributor); //   tu

router.use('/franchiser',Franchiser);  //   tu

router.use('/user',User);     // tu
router.use('/brand',Brand);  //  brand and franchise or same  convert in single 

router.use('/login',Login);
router.use('/product',Product);
router.use('/contactUs',ContactUs);
router.use('/category',Category);
router.use('/proposal',Proposal);
router.use('/payment',payment);

export default router ;