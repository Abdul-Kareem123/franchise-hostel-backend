import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { contactUs,getAllContactUs } from "../controller/contactus.controller";
import { checkSession } from "../utils/tokenManager";
const router:Router=Router()
 
router.post("/",
basicAuthUser,
checkSession,
contactUs
);

router.get('/',
basicAuthUser,
checkSession,
getAllContactUs
);
 
export default router;