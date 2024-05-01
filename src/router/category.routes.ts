import { Router } from 'express';
import { addCategory,getCategories,getFilteredCategory,updateCategory } from '../controller/category.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/', // create category
    basicAuthUser,
    // checkSession,
    addCategory);

router.get('/', // get all category
    basicAuthUser,
    // checkSession,
    getCategories);

router.put('/', // update category
    basicAuthUser,
    // checkSession,
    checkRequestBodyParams('_id'),
    updateCategory);

router.put('/getFilterCategory',
    basicAuthUser,
    // checkSession,
    getFilteredCategory);

export default router;