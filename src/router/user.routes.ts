import { Router } from "express";
const router:Router = Router();
import { createUser, getAllUsers, updateUser, getSingleUser, deleteUser } from "../controller/user.controller";
import { basicAuthUser } from "../middleware/checkAuth";
import { checkSession } from "../utils/tokenManager";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";

router.post('/', //save user
    basicAuthUser,
    checkRequestBodyParams('mobileNumber'),
    createUser);

router.get('/', //get all user
    basicAuthUser,
    checkSession,
    getAllUsers);

router.put('/', //update user
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateUser);

router.get('/singleUser', //get single user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleUser);

router.delete('/', //delete user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deleteUser);

export default router;