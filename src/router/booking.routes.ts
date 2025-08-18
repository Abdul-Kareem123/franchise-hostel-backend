import { Router } from "express";
const router:Router = Router();
import { createBooking, getAllCustomersData } from '../controller/booking.controller';
import { bookingValidationRules } from "../middleware/Validators";
import { basicAuthUser } from '../middleware/checkAuth';


router.post('/', basicAuthUser, bookingValidationRules, createBooking);
router.get('/', basicAuthUser, getAllCustomersData);
export default router;