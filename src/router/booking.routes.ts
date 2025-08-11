import { Router } from "express";
const router:Router = Router();
import { createBooking } from '../controller/booking.controller';
import { bookingValidationRules } from "../middleware/Validators";
import { basicAuthUser } from '../middleware/checkAuth';


router.post('/', basicAuthUser, bookingValidationRules, createBooking);

export default router;