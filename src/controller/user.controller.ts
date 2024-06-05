import { validationResult } from 'express-validator';
import { Distributor, DistributorDocument } from '../models/distributor.model';
import { Franchiser, FranchiserDocument } from '../models/franchiser.model';
import { User, UserDocument } from '../models/user.model';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import * as TokenManager from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';
import { error } from 'console';

const activity = 'USER';

/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save User.
 */
export const createUser = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const distributorData = await Distributor.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const franchiserData = await Franchiser.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const userData = await User.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (!userData && !distributorData && !franchiserData) {
                const userDetails: UserDocument = req.body;
                const date = new Date(); 
                userDetails.createdOn = convertUTCToIST(date);
                const otp = Math.floor(1000 + Math.random() * 9000)
                userDetails.otp = otp;
                const createData = new User(userDetails);
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
                finalResult["loginType"] = "User";
                finalResult["User-Details"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-User',true,200,finalResult,clientError.success.savedSuccessfully);
            } else {
                response(req,res,activity,'Level-3','Save-User',false,422,{},clientError.mobile.mobileExist);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-User',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Save-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all User.
 */
export let getAllUsers = async (req, res, next) => {
    try {
        const userList = await User.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-User', true, 200, userList, clientError.success.success);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update user.
 */
export let updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const userDetails: UserDocument = req.body;
            const date = new Date(); 
            const userData = await User.findOne({ $and: [ { _id: userDetails._id }, { isDeleted: false }] });
            if (userData) {
                const updateUser = new User(userDetails) 
                let insertUser = await updateUser.updateOne({
                    $set: {
                        name: userDetails.name,
                        mobileNumber: userDetails.mobileNumber,
                        address: userDetails.address,
                        state: userDetails.state,
                        modifiedOn: convertUTCToIST(date),
                        modifiedBy: userDetails.name
                    }
                })
                response(req, res, activity, 'Level-2', 'Update-User', true, 200, insertUser, clientError.success.updateSuccess);
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-User', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-User', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}

/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get single User.
 */
export let getSingleUser = async (req, res, next) => {
    try {
        const single = await User.findOne({$and:[{isDeleted:false},{ _id: req.query._id }] })
        if (single) {
            response(req, res, activity, 'Level-2', 'Get-User', true, 200, single, clientError.success.fetchedSuccessfully);
        } else {
            response(req, res, activity, 'Level-3', 'Get-User', true, 422, {}, clientError.user.userDontExist);
        }
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Get-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 16-05-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete single User.
 */
export let deleteUser = async (req, res, next) => {
    try {
        const deleteData = await User.findByIdAndUpdate({ _id: req.query._id }, { $set: { isDeleted: true } });
        response(req, res, activity, 'Level-2', 'Delete-User', true, 200, deleteData, clientError.success.deleteSuccess);
    } catch (err) {
        response(req, res, activity, 'Level-3', 'Delete-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}