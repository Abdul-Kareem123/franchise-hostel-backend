import { validationResult } from 'express-validator';
import { Franchise, FranchiseDocument } from '../models/franchise.model';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import * as TokenManager from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';
import { Franchiser } from '../models/franchiser.model';

const activity = 'FRANCHISE';

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to post Franchise or create franchise
 */
export const createFranchise = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const franchiseData = await Franchiser.findOne({ $and: [{ isDeleted: false }, { _id: req.body.distributorId }] });
            if (!franchiseData) {
                response(req,res,activity,'Level-2','Save-Franchise',true,200,{},clientError.Franchise.FranchiseNotExist);
            }
            else {
                const franchiseData : FranchiseDocument = req.body;
                const date = new Date(); 
                franchiseData.createdOn = convertUTCToIST(date);
                const createFranchise = new Franchise(franchiseData);
                let insertFranchise = await createFranchise.save();
                response(req,res,activity,'Level-2','Save-Franchise',true,200,insertFranchise,clientError.success.savedSuccessfully);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-Franchise',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Save-Franchise', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all franchise
 */
export const getAllFranchise = async (req,res,next) => {
    try {
        const getFranchise = await Franchise.find({isDeleted:false});
        response(req,res,activity,'Level-2','Get-Franchise',true,200,getFranchise,clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req,res,activity,'Level-3','Get-Franchise',false,500,{},errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 08-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single franchise Id.
 */
export const getSingleFranchise = async (req,res,next) => {
    try {
        const getFranchise = await Franchise.findOne({$and:[{isDeleted:false},{ _id: req.query._id }]}).populate({path: 'distributorId', select: 'mobileNumber'})
        response(req,res,activity,'Level-2','Get-Franchise',true,200,getFranchise,clientError.success.fetchedSuccessfully);
    } catch (err: any) {
        response(req,res,activity,'Level-3','Get-Franchise',false,500,{},errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single franchise by distributor id
 */
export const getFranchiseByDistributor = async (req,res,next) => {
    try {
        const franchise = await Franchise.find({$and:[{isDeleted:false},{distributorId:req.query.distributorId}]});
        response(req,res,activity,'Level-2','Get-Franchise',true,200,franchise,clientError.success.fetchedSuccessfully);
    } catch (error) {
        response(req,res,activity,'Level-3','Get-Franchise',false,500,{},errorMessage.internalServer, error.message);
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update the franchise.
 */
export const updateFranchise = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const franchiseData = await Franchise.findOne({ $and: [{ isDeleted: false }, { _id: req.body._id }] });
            if (!franchiseData) {
                response(req,res,activity,'Level-2','Update-Franchise',true,200,{},clientError.Franchise.FranchiseNotExist);
            } else {
                const franchiseData : FranchiseDocument = req.body;
                let date = new Date();
                const updateFranchise = await Franchise.findByIdAndUpdate({ _id: franchiseData._id }, { 
                    $set: {
                        franchiseName: req.body.franchiseName,
                        category: req.body.category,
                        subCategory: req.body.subCategory,
                        brand: req.body.brand,
                        location: req.body.location,
                        description: req.body.description,
                        image: req.body.image,
                        rateOfInterest: req.body.rateOfInterest,
                        investmentAmount: req.body.investmentAmount,
                        specialFeatures: req.body.specialFeatures,
                        email: req.body.email,
                        modifiedOn: convertUTCToIST(date),
                        modifiedBy: req.body.modifiedBy
                    } 
                });
                response(req,res,activity,'Level-2','Update-Franchise',true,200,updateFranchise,clientError.success.updateSuccess);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Update-Franchise',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Update-Franchise', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 01-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete franchise.
 */
export const deleteFranchise = async (req,res,next) => {
    try {
        const franchiseData = await Franchise.findOne({$and:[{isDeleted:false},{ _id: req.query._id }]});
        if (!franchiseData) {
            response(req,res,activity,'Level-3','Delete-Franchise',true,200,{},clientError.Franchise.FranchiseNotExist);
        } else {
            const franchiseData : FranchiseDocument = req.body;
            const date = new Date();
            const update = await Franchise.findByIdAndUpdate({ _id: franchiseData._id }, {
                $set: {
                    isDeleted: true,
                    modifiedOn: convertUTCToIST(date),
                    modifiedBy: req.body.modifiedBy
                }
            });
            response(req,res,activity,'Level-2','Delete-Franchise',true,200,update,clientError.success.deleteSuccess);
        }
    } catch (error) {
        response(req,res,activity,'Level-3','Delete-Franchise',false,500,{},errorMessage.internalServer, error.message);
    }
}