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
import roomRoutes from './room.routes';
import bookingRoutes from './booking.routes';
import ownerRoutes from './owner.routes';
import ownerLoginRoutes from './ownerLogin.routes';
import dashboardRoutes from './dashboard.routes';
import buildingRoutes from './building.routes';


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
router.use('/rooms', roomRoutes);
router.use('/booking', bookingRoutes);
router.use('/owner', ownerRoutes);
router.use('/auth', ownerLoginRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/buildings', buildingRoutes);


export default router ;