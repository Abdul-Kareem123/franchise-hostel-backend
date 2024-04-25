import { validationResult } from 'express-validator';
import { Franchise, FranchiseDocument } from '../models/franchise.model';
import { response, convertUTCToIST } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import * as TokenManager from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';
import { Distributor } from '../models/distributor.model';
import { log } from 'console';

const activity = 'FRANCHISE';

/**
 * @author Haripriyan K
 * @date 03-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save Franchise
 */
export const saveFranchise = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const franchiseData = await Franchise.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (!franchiseData) {
                const createFranchise: FranchiseDocument = req.body;
                const otp = Math.floor(1000 + Math.random() * 9000)
                // createFranchise.otp = otp
                const createData = new Franchise(createFranchise);
                const insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    mobileNumber: insertData['mobileNumber'],
                });
                const result = {};
                result['_id'] = insertData['_id'];
                result['mobileNumber'] = insertData['mobileNumber'];
                result['otp'] = insertData['otp'];
                let finalResult = {};
                // finalResult["loginType"] = "franchise";
                // finalResult["createFranchise"] = result;
                // finalResult["token"] = token;
                // sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-Franchise',true,200,finalResult,clientError.success.savedSuccessfully);
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
 * @date 25-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to post Franchise or create franchise
 */
export const postFranchise = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const franchiseData = await Distributor.findOne({ $and: [{ isDeleted: false }, { _id: req.body.distributorId }] });
            if (!franchiseData) {
                response(req,res,activity,'Level-2','Save-Franchise',true,200,{},clientError.user.userDontExist);
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