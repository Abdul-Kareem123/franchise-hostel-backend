import { Router } from "express";
const router:Router = Router();
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { createProposal } from "../controller/proposal.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //create proposal
    basicAuthUser,
     checkSession,
    checkRequestBodyParams('name'),
    checkRequestBodyParams('email'),
    checkRequestBodyParams('phone'),
    createProposal);



export default  router