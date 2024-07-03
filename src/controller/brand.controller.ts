import { validationResult } from 'express-validator';
import { Distributor, DistributorDocument } from '../models/distributor.model';
import { Franchise } from '../models/franchise.model';
import { User, UserDocument } from '../models/user.model';
import { Brand, BrandDocument } from '../models/brand.model';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';

const activity = 'BRAND';

/**
 * @author Haripriyan K
 * @date 30-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to create Brands.
 */
export const createBrand = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const brandData = await Distributor.findOne({$and:[{isDeleted:false},{ _id: req.body.distributorId }]})
            if (!brandData) {
                response(req, res, activity, 'Level-3', 'Save-Brand', true, 422, {}, clientError.user.userDontExist);
            } else {
                const brandData : BrandDocument = req.body;
                const date = new Date();
                brandData.createdOn = convertUTCToIST(date);
                const createBrand = new Brand(brandData);
                const result = await createBrand.save();
                response(req, res, activity, 'Level-2', 'Save-Brand', true, 200, result, clientError.success.success);
            }
        } catch (error) {
            response(req, res, activity, 'Level-3', 'Save-Brand', false, 500, {}, errorMessage.internalServer, error.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Save-Brand', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 30-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Brands.
 */
export const getBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find({isDeleted:false}).sort({_id:-1}).limit(16)
        if (brands) {
            response(req, res, activity, 'Level-2', 'Get-Brands', true, 200, brands, clientError.success.fetchedSuccessfully);
        }
    } catch (error) {
        response(req, res, activity, 'Level-3', 'Get-Brands', false, 500, {}, errorMessage.internalServer, error.message);
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Brands by distributor.
 */
export const getBrandsByDistributor = async (req, res, next) => {
    try {
        const brands = await Brand.find({ $and:[{isDeleted:false},{ distributorId: req.query.distributorId }] });
        response(req, res, activity, 'Level-2', 'Get-Brands', true, 200, brands, clientError.success.fetchedSuccessfully);
    } catch (error) {
        response(req, res, activity, 'Level-3', 'Get-Brands', false, 500, {}, errorMessage.internalServer, error.message);
    }
}

/**
 * @author Haripriyan K
 * @date 07-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Brands by Id.
 */
export const getSingleBrand= async (req, res, next) => {
    try {
        const brands = await Brand.find({ $and:[{isDeleted:false},{ _id: req.query._id }] });
        response(req, res, activity, 'Level-2', 'Get-Brands', true, 200, brands, clientError.success.fetchedSuccessfully);
    } catch (error) {
        response(req, res, activity, 'Level-3', 'Get-Brands', false, 500, {}, errorMessage.internalServer, error.message);
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update brand.
 */
export const updateBrand = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const brandData = await Brand.findOne({$and:[{isDeleted:false},{ _id: req.body._id }]})
            if (!brandData) {
                response(req, res, activity, 'Level-3', 'Update-Brand', true, 422, {}, clientError.Brand.brandNotExist);
            } else {
                const brandData : BrandDocument = req.body;
                const date = new Date();
                const updateBrand = await Brand.findByIdAndUpdate({ _id: brandData._id }, {
                    $set: {
                        brandName: brandData.brandName,
                        category: brandData.category,
                        imageUrl: brandData.imageUrl,
                        investmentAmount: brandData.investmentAmount,
                        modifiedOn: convertUTCToIST(date),
                        modifiedBy: brandData.modifiedBy
                    }
                },{new:true});
                response(req, res, activity, 'Level-2', 'Update-Brand', true, 200, updateBrand, clientError.success.updateSuccess);
            }
        } catch (error) {
            response(req, res, activity, 'Level-3', 'Update-Brand', false, 500, {}, errorMessage.internalServer, error.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Brand', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Kaaaviyan 
 * @date 01-07-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update brand.
 */
export const updateBrandAmount = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const brandData = await Brand.findOne({$and:[{isDeleted:false},{ _id: req.body._id }]})
            if (!brandData) {
                response(req, res, activity, 'Level-3', 'Update-Brand', true, 422, {}, clientError.Brand.brandNotExist);
            } else {
                const brandData : BrandDocument = req.body;
                const date = new Date();
                const updateBrand = await Brand.findByIdAndUpdate({ _id: brandData._id }, {
                    $set: {
                        Amount:brandData.Amount,
                        modifiedOn: convertUTCToIST(date),
                        modifiedBy: brandData.modifiedBy
                    }
                },{new:true});
                response(req, res, activity, 'Level-2', 'Update-Brand', true, 200, updateBrand, clientError.success.updateSuccess);
            }
        } catch (error) {
            response(req, res, activity, 'Level-3', 'Update-Brand', false, 500, {}, errorMessage.internalServer, error.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Brand', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete brand.
 */
export const deleteBrand = async (req, res, next) => {
    try {
        const brandData = await Brand.findOne({$and:[{isDeleted:false},{ _id: req.query._id }]})
        if (!brandData) {
            response(req, res, activity, 'Level-3', 'Delete-Brand', true, 422, {}, clientError.Brand.brandNotExist);
        } else {
            const date = new Date();
            const brand = await Brand.findByIdAndUpdate({ _id: brandData._id }, {
                $set: {
                    isDeleted: true,
                    modifiedOn: convertUTCToIST(date),
                    modifiedBy: brandData.modifiedBy
                }
            },{new:true});
            const update = await Brand.findOne({ _id: req.query._id })
            response(req, res, activity, 'Level-2', 'Delete-Brand', true, 200, update, clientError.success.deleteSuccess);
        }
    } catch (error) {
        response(req, res, activity, 'Level-3', 'Delete-Brand', false, 500, {}, errorMessage.internalServer, error.message);
    }
}



/**
 * @author Kaaaviyan 
 * @date 01-07-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update brand.
 */
export const CoinsDeduction = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body; 
            const date = new Date();
            const brandData : BrandDocument = req.body;
            const userData = await User.findOne({_id: userDetails.userId},{name:1,userId:1})
            console.log(userData);
            
           if (userData) {
            const brandDatas = await Brand.findOne({_id:brandData._id},{Amount:1 , _id:0})
            console.log(brandDatas);

              if (brandData) {
                const data = await Brand.findByIdAndUpdate({ _id: brandData._id }, {$push:{
                  userList:[{userName:userData.name ,userId:userData.userId}] }})
                    const deduct = brandDatas.Amount - 10 ;
                    console.log(deduct);
                    
                 const deducts = await Brand.findByIdAndUpdate({ _id: brandData._id }, {$set:{
                    Amount:deduct,
                    modifiedOn: convertUTCToIST(date),
                    modifiedBy: brandData.modifiedBy
                 }}) 
                 response(req, res, activity, 'Level-2', 'Update-Coins-Deduction', true, 200, deducts, clientError.success.updateSuccess);

              } else {
                response(req, res, activity, 'Level-2', 'Update-Coins-Deduction', false, 422, {}, clientError.Brand.brandNotExist);
 
              }
           } else {
            response(req, res, activity, 'Level-2', 'Update-Coins-Deduction', true, 422, {}, clientError.user.UserNotFound);

           }
        } catch (error) {
            response(req, res, activity, 'Level-3', 'Update-Coins-Deduction', false, 500, {}, errorMessage.internalServer, error.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Coins-Deduction', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}