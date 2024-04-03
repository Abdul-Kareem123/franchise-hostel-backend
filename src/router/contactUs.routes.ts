import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
// import {  } from "";
const router:Router=Router()
 
// router.post("/",
// basicAuthUser,
// checkSession,
// contactUs
// );

// router.get('/',
// basicAuthUser,
// checkSession,
// getAllContactUs
// );

// router.get('/singleuser',
// basicAuthUser,
// checkSession,
// findSingle
// );
 
export default router;