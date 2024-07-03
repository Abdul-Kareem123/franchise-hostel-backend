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

router.use('/distributor',Distributor);
router.use('/franchise',Franchise);
router.use('/login',Login);
router.use('/product',Product);
router.use('/contactUs',ContactUs);
router.use('/category',Category);
router.use('/brand',Brand);
router.use('/franchiser',Franchiser);
router.use('/user',User);
router.use('/proposal',Proposal);

export default router ;