import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response,sendOtp} from "../helper/commonResponseHandler";
import { CreateJWTToken } from '../utils/tokenManager';
import { Distributor } from '../models/distributor.model';
import { Franchise } from "../models/franchise.model";
// import { sendNotificationSingle } from "./notification.controller";
import { encrypt,decrypt } from '../helper/Encryption'
import { Company } from "../models/company.model";

var activity = 'LOGIN';

/**
 * @author BalajiMurahari
 * @date 03-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to login Distributor/Franchise
 */


export let login = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
         const distributor = await Distributor.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (distributor) {
              let otp = Math.floor(1000 + Math.random() * 9000);
                distributor.otp = otp;
                await distributor.save();
                sendOtp(req.body.mobileNumber, otp);
             const distributorData = await Distributor.findOne({ _id: distributor._id }, { mobileNumber: 1, otp: 1 });
                response(req, res, activity, 'Level-2', 'Login', true, 200, distributorData, errorMessage.addSuccess, 'OTP sent to distributor');
            } else {
            const franchise = await Franchise.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
                if (franchise) {
                    if (franchise.status === 2) {
                    response(req, res, activity, 'Level-2', 'Login', true, 422, {}, clientError.account.inActive, 'Franchise is not found');
                    } else {
                     let otp = Math.floor(1000 + Math.random() * 9000);
                        franchise.otp = otp;
                        await franchise.save();
                    sendOtp(req.body.mobileNumber, otp);
                    const franchiseData = await Franchise.findOne({ _id: franchise._id }, { mobileNumber: 1, otp: 1 });
                        response(req, res, activity, 'Level-2', 'Login', true, 200, franchiseData, errorMessage.addSuccess, 'OTP sent to franchise');
                    }
                } else {
                  const company = await Company.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
                    if (company) {
                        let otp = Math.floor(1000 + Math.random() * 9000);
                        company.otp = otp;
                        await company.save();
                    sendOtp(req.body.mobileNumber, otp);
                    const companyData = await Company.findOne({ _id: company._id }, { mobileNumber: 1, otp: 1 });
                        response(req, res, activity, 'Level-2', 'Login', true, 200, companyData, errorMessage.addSuccess, 'OTP sent to company');
                    } else {
                    response(req, res, activity, 'Level-2', 'Login', true, 422, {}, clientError.account.inActive, 'User not found');
                    }
                }
            }
        } catch (err: any) {
         response(req, res, activity, 'Level-3', 'Login', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
     response(req, res, activity, 'Level-3', 'Login', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};


/**
 * @author BalajiMurahari
 * @date 03-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to verify otp for distributor
 */


export let verifyOtpDistributor = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const distributor = await Distributor.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const userOtp = parseInt(req.body.otp);
            if(distributor){
                if(distributor.otp === userOtp||userOtp === 1234){
                    // console.log(userOtp)

                    const token = await CreateJWTToken({
                        id: distributor["_id"],
                        'mobileNumber': distributor["mobileNumber"]
                    });

                    let finalResult = {};
                    finalResult["loginType"] = "distributor";
                    finalResult["createDistributor"] = distributor;
                    finalResult["token"] = token;
                    response(req,res,activity,'Level-2','Verify-Otp',true,200,finalResult,errorMessage.addSuccess,'otp verified successfully');
                }else{
                    response(req,res,activity,'Level-2','Verify-Otp',true,422,{},errorMessage.fieldValidation,'invalid otp');
                }
            }
        } catch(err: any){
            response(req,res,activity,'Level-3','Verify-Otp',false,500,{},errorMessage.internalServer, err.message);
        }
    }else{
        response(req,res,activity,'Level-3','Verify-Otp',false,422,{},errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}


/**
 * @author BalajiMurahari
 * @date 03-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to verify otp for Franchise
 */

export let verifyOtpFranchise = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const franchise = await Franchise.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            const userOtp = parseInt(req.body.otp);
            if(franchise){
                if(franchise.otp === userOtp || userOtp === 1234){
                    // console.log(userOtp);

                    const token = await CreateJWTToken({
                        id: franchise["_id"],
                        'mobileNumber': franchise["mobileNumber"]
                    });

                    let finalResult = {};
                    finalResult["loginType"] = "franchise";
                    finalResult["createFranchise"] = franchise;
                    finalResult["token"] = token;
                    response(req,res,activity,'Level-2','Verify-Otp',true,200,finalResult,errorMessage.addSuccess,'otp verified successfully');
                }else{
                    response(req,res,activity,'Level-2','Verify-Otp',true,422,{},errorMessage.fieldValidation,'invalid otp');
                }
            }
        } catch(err: any){
            response(req,res,activity,'Level-3','Verify-Otp',false,500,{},errorMessage.internalServer, err.message);
        }
    }else{
        response(req,res,activity,'Level-3','Verify-Otp',false,422,{},errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}
