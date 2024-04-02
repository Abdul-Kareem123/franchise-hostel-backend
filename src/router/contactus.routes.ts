import { Router } from "express";
import { basicAuthUser } from "../middleware/checkAuth";
import { contactUs, getSingleUser } from "../controller/contactus.controller";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
const router:Router=Router()

router.post("/",
basicAuthUser,
checkSession,
contactUs
);

router.get("/",
basicAuthUser,
checkSession,
checkQuery('_id'),
getSingleUser
);
export default router;