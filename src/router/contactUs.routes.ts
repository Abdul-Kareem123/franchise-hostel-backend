import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { contactUs, getAllContactUs, getBrandContactUser, getSingle } from "../controller/contactUs.controller";
const router:Router=Router()
 
router.post("/",
basicAuthUser,
// checkSession,
contactUs
);

router.get('/',
basicAuthUser,
// checkSession,
getAllContactUs
);

router.get('/singleuser',
basicAuthUser,
// checkSession,
getSingle
);

router.get('/contactuser',
    basicAuthUser,
    // checkSession,
    getBrandContactUser
    );
     
 
export default router;