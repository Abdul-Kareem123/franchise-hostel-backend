import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { contactUs,findSingle,getAllContactUs } from "../controller/contactUs.controller";
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

router.get('/singleuser',
basicAuthUser,
checkSession,
findSingle
);
 
export default router;