import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response } from "../helper/commonResponseHandler";
import { Product, ProductDocument } from "../models/product.model";
import *  as TokenManager from "../utils/tokenManager";


var activity = "Product";

/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save product
 */

export let saveProduct = async (req, res, next) => {
 const errors = validationResult(req);
 if (errors.isEmpty()) {
     try {
         const productDetails: ProductDocument = req.body;
         const createData = new Product(productDetails);
         const insertData = await createData.save();
         response(req, res, activity, 'Level-2', 'Save-Product', true, 200, insertData, clientError.success.savedSuccessfully);
     }
     catch (err: any) {
        response(req, res, activity, 'Level-3', 'Save-Product', false, 500, {}, errorMessage.internalServer, err.message);
     }
 } 
 else {
     response(req, res, activity, 'Level-3', 'Save-Product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
 }  
}

// export let saveProduct = async (req, res, next: any) => {
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//         try {
//             const productDetails: ProductDocument = req.body;

//             const { originalPrice, discountPercentage, gstRate, specifications:rawSpecifications } = productDetails;
              
//             const finalPrice = Number(originalPrice) + Number((Number(originalPrice) * Number(gstRate)) / 100);  // gst will be added
//             productDetails.finalPrice =Math.round(Number(finalPrice));
 
//             const discountedPrice = Number(finalPrice) - Number(Number(finalPrice) * Number(discountPercentage) / 100); // discount will be added
//             productDetails.discountedPrice =Math.round (Number(discountedPrice));

//             let specifications :any[]= [];
//             if (Array.isArray(rawSpecifications)) {
//                 specifications = rawSpecifications.map((spec: any) => ({
//                     heading: spec.heading,
//                     points: spec.points,
//                 }));
//             }
            
//             const createData = new Product(productDetails);
//             const insertData = await createData.save();

//             if (insertData && insertData._id) {
//                 const purchasedProduct = await Product.findById(insertData._id);
//                 if (purchasedProduct) {
//                     purchasedProduct.quantity -= 1;
//                     await purchasedProduct.save();-+


    
//                 }
//             }

//             response(req, res, activity, 'Level-2', 'Save-Product', true, 200, insertData, clientError.success.savedSuccessfully);
//         }
//         catch (err: any) {
//             response(req, res, activity, 'Level-3', 'Save-Product', false, 500, {}, errorMessage.internalServer, err.message);
//         }
//     } else {
//         response(req, res, activity, 'Level-3', 'Save-Product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
//     }
// };



  


/**
 * @author BalajiMurhari
 * @date   07-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all products
 */

export let getAllProduct = async (req, res, next) => {
        try {
            const productDetails = await Product.find({isDeleted: false}).sort({ createdAt: -1});
            response(req, res, activity, 'Level-2', 'Get-All-Product', true, 200, productDetails, clientError.success.fetchedSuccessfully);   
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Get-All-Product', false, 500, {}, errorMessage.internalServer, err.message);
        }
};

/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update product.
 */

export let updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const productDetails: ProductDocument = req.body;
            const updateData = await Product.findByIdAndUpdate({_id:req.body._id},{
                $set: {
                    categoryImage: productDetails.categoryImage,
                    categoryName: productDetails.categoryName,
                    productName: productDetails.productName,
                    productDescription: productDetails.productDescription,
                    topImage: productDetails.topImage,
                    sideImage: productDetails.sideImage,
                    frontImage: productDetails.frontImage,
                    backImage: productDetails.backImage,
                    productGif: productDetails.productGif,
                    specifications: productDetails.specifications,
                    selling: productDetails.selling,
                    originalPrice: productDetails.originalPrice,
                    discountPercentage: productDetails.discountPercentage,
                    discountedPrice: productDetails.discountedPrice,
                    productImage: productDetails.productImage,
                    quantity: productDetails.quantity,
                    gstRate: productDetails.gstRate,
                    gstAmount: productDetails.gstAmount,
                    benefits: productDetails.benefits,
                    finalPrice: productDetails.finalPrice,
                    rating: productDetails.rating,
                    comment: productDetails.comment,
                    title: productDetails.title,
                    images: productDetails.images,

                }
        
            }) 
            response(req, res, activity, 'Level-2', 'Update-Product', true, 200, updateData, clientError.success.updateSuccess);
        }
        catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Product', false, 500, {}, errorMessage.internalServer, err.message);
        }
    }
    else {
        response(req, res, activity, 'Level-3', 'Update-Product', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete product
 */

export let deleteProduct = async (req, res, next) => {
    try {
        const productDetails = await Product.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy
            }
        });
        response(req, res, activity, 'Level-2', 'Delete-Product', true, 200, productDetails, clientError.success.deleteSuccess);
    }
    catch (err: any) {
        response(req, res, activity, 'Level-3', 'Delete-Product', false, 500, {}, errorMessage.internalServer, err.message);
    }
}


/**
 * @author BalajiMurhari
 * @date   08-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Filtered product
 */

export let getFilteredProduct = async (req, res, next) => {
    try {

        var findQuery;
        var andList: any = []
        var limit = req.body.limit ? req.body.limit : 0;
        var page = req.body.page ? req.body.page : 0;
        andList.push({ isDeleted: false })
        andList.push({ status: 1 })
        if(req.body.panelId){
            andList.push({panelId:req.body.panelId})
        }
        if (req.body.productName) {
            andList.push({ productName: { productName: req.body.productName } })
        }
        if (req.body.productPrice) {
            andList.push({ productPrice: req.body.productPrice })
        }
        if (req.body.productDiscount) {
            andList.push({ productDiscount: req.body.productDiscount })
        }
        if (req.body.selling) {
            andList.push({ selling: req.body.selling })
        }
        
        findQuery = (andList.length > 0) ? { $and: andList } : {}
        const productList = await Product.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(page).populate('panelId',{companyName:1}).populate('companyId',{companyName:1});
        const productCount = await Product.find(findQuery).countDocuments();
        response(req, res, activity, 'Level-1', 'Get-FilterPost', true, 200, { productList, productCount }, clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-FilterPost', false, 500, {}, errorMessage.internalServer, err.message);
    }
};


