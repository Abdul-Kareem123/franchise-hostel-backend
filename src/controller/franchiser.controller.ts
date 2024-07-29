import { validationResult } from 'express-validator';
import { Distributor, DistributorDocument } from '../models/distributor.model';
import { Franchiser, FranchiserDocument } from '../models/franchiser.model';
import { User, UserDocument } from '../models/user.model';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import * as TokenManager from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';

const activity = 'FRANCHISER';

/**
 * @author Haripriyan K.
 * @date 13-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save franchiser.
 */
export const createFranchiser = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const distributorData = await Distributor.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const franchiserData = await Franchiser.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (!distributorData || !franchiserData || !userData) {
                const franchiserDetails: FranchiserDocument = req.body;
                const date = new Date(); 
                franchiserDetails.createdOn = convertUTCToIST(date);
                const otp = Math.floor(1000 + Math.random() * 9000)
                franchiserDetails.otp = otp;
                const createData = new Franchiser(franchiserDetails);
                const insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({ 
                    id: insertData["_id"],
                    mobileNumber: insertData['mobileNumber']
                });
                const result = {};
                result['_id'] = insertData['_id'];
                result['mobileNumber'] = insertData['mobileNumber'];
                result['otp'] = insertData['otp'];
                let finalResult = {};
                finalResult["loginType"] = "Franchiser";
                finalResult["Franchiser-Details"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-Franchiser',true,200,finalResult,clientError.success.savedSuccessfully);
            } else {
                response(req,res,activity,'Level-3','Save-Franchiser',false,422,{},clientError.mobile.mobileExist);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-Franchiser',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Save-Franchiser', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Haripriyan K
 * @date 13-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all franchisers list.
 */
export let getAllFranchisers = async (req, res, next) => {
    try {
        const franchiserList = await Franchiser.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-Franchiser', true, 200, franchiserList, clientError.success.success);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Franchiser', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 13-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update franchiser.
 */
export let updateFranchiser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const franchiserDetails: FranchiserDocument = req.body;
            const date = new Date(); 
            const franchiserData = await Franchiser.findOne({ $and: [ { _id: franchiserDetails._id }, { isDeleted: false }] });
            if (franchiserData) {
                let insertFranchiser = await Franchiser.updateOne({_id:franchiserDetails._id},{
                    $set: {
                        name: franchiserDetails.name,
                        email: franchiserDetails.email,
                        // companyName: franchiserDetails.companyName,
                        // productName: franchiserDetails.productName,
                        state: franchiserDetails.state,
                        city: franchiserDetails.city,
                        pinCode: franchiserDetails.pinCode,
                        bearer_Token : franchiserDetails.bearer_Token,
                        modifiedOn: convertUTCToIST(date),
                        modifiedBy: franchiserDetails.name
                    }
                })
                response(req, res, activity, 'Level-2', 'Update-Franchiser', true, 200, insertFranchiser, clientError.success.updateSuccess);
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Franchiser', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Franchiser', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 17-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single Franchiser.
 */
export let getSingleFranchiser = async (req, res, next) => {
    try {
        const single = await Franchiser.findOne({$and:[{isDeleted:false},{ _id: req.query._id }] })
        if (single) {
            response(req, res, activity, 'Level-2', 'Get-Franchiser', true, 200, single, clientError.success.fetchedSuccessfully);
        } else {
            response(req, res, activity, 'Level-3', 'Get-Franchiser', true, 422, {}, clientError.user.userDontExist);
        }
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Get-Franchiser', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 17-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete single Franchiser.
 */
export let deleteFranchiser = async (req, res, next) => {
    try {
        const deleteData = await Franchiser.findByIdAndUpdate({ _id: req.query._id }, { $set: { isDeleted: true } });
        response(req, res, activity, 'Level-2', 'Delete-Franchiser', true, 200, deleteData, clientError.success.deleteSuccess);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Delete-Franchiser', false, 500, {}, errorMessage.internalServer, err.message);
    }
}