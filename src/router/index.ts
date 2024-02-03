import {Router} from 'express';
const router : Router = Router();
 
import Distributor from './distributor.routes';
import Franchise from './franchise.routes';
import Login from './login.routes';



router.use('/distributor',Distributor);
router.use('/franchise',Franchise);
router.use('/login',Login);




export default router