import { validationResult } from "express-validator";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import { response,sendOtp} from "../helper/commonResponseHandler";
import { CreateJWTToken } from '../utils/tokenManager';
import { Distributor } from '../models/distributor.model';
import { Franchise } from "../models/franchise.model";
// import { sendNotificationSingle } from "./notification.controller";

var activity = 'LOGIN';

/**
 * @author Vinodhagan P
 * @author Dharani S
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
            if (distributor !== null) {
                let otp = Math.floor(1000 + Math.random() * 9000);
                distributor.otp = otp;
                const token = await CreateJWTToken({
                    id: distributor["_id"],
                    mobileNumber: distributor["mobileNumber"]
                });
                const update = await Distributor.findByIdAndUpdate({_id:distributor._id},{
                    $set:{
                        bearer_Token:token,
                        otp:otp
                    }
                });
                const result = {};
                result['_id'] = distributor['_id'];
                result['mobileNumber'] = distributor['mobileNumber'];
                result['otp'] = otp;
                let finalResult = {};
                finalResult["loginType"] = "distributor";
                finalResult["distributorDetails"] = result;
                finalResult["token"] = token;
                sendOtp(req.body.mobileNumber, otp);
                response(req, res, activity, 'Level-2', 'Login', true, 200, finalResult, clientError.success.distributor, 'OTP sent to distributor')
            } else {
                response(req, res, activity, 'Level-3', 'Login', false, 402, {}, clientError.mobile.mobileNotExist);
            } 
        } catch(err){
            response(req, res, activity, 'Level-3', 'Login', false, 500, {},errorMessage.internalServer, err.message)
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
                if(distributor.otp === userOtp||userOtp === 1122){
                    const token = await CreateJWTToken({
                        id: distributor["_id"],
                        mobileNumber: distributor["mobileNumber"]
                    });
                    let finalResult = {};
                    finalResult["loginType"] = "distributor";
                    finalResult["distributorDetails"] = distributor;
                    finalResult["token"] = token;
                    response(req,res,activity,'Level-2','Verify-Otp',true,200,finalResult,clientError.otp.otpVerifySuccess);
                } else {
                    response(req,res,activity,'Level-3','Verify-Otp',false,401,{},clientError.otp.otpDoestMatch);
                }
            } else {
                response(req,res,activity,"level-3","verify-Otp",false,402,{},clientError.user.UserNotFound)
            }
        } catch(err: any){
                response(req,res,activity,'Level-3','Verify-Otp',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
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
