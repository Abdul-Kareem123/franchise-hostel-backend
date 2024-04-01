import {Router} from 'express';
import {saveProduct,getAllProduct,updateProduct,deleteProduct,getFilteredProduct} from '../controller/product.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/', // create product
    basicAuthUser,
    checkSession,
    saveProduct
);  

router.get('/', // get all product
    basicAuthUser,
    checkSession,
    getAllProduct
);

router.put('/', // update product
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateProduct
);

router.delete('/', // delete product
    basicAuthUser,
    checkSession,
    deleteProduct   
);

router.put('/getFilterProduct', // get filtered product
    basicAuthUser,
    checkSession,
    getFilteredProduct
);

export default router;