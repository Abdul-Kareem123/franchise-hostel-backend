import { validationResult } from 'express-validator';
import { Distributor,DistributorDocument } from '../models/distributor.model';
import { response } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import {CreateJWTToken } from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';

const activity = 'DISTRIBUTOR';


/**
 * @author BalajiMurahari
 * @date 02-02-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save Distributor
 */


export const saveDistributor = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const distributorData = await Distributor.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (!distributorData) {
                const createDistributor: DistributorDocument = req.body;
                const otp = Math.floor(1000 + Math.random() * 9000)
                createDistributor.otp = otp;
                const createData = new Distributor(createDistributor);
                const insertData = await createData.save();
                const token = await CreateJWTToken({ 
                    id: insertData["_id"],
                    'mobileNumber': insertData['mobileNumber'],
                    'otp': insertData['otp']
                 });
                const result = {};
                result['_id'] = insertData['_id'];
                result['mobileNumber'] = insertData['mobileNumber'];
                result['otp'] = insertData['otp'];
                let finalResult = {};
                finalResult["loginType"] = "distributor";
                finalResult["createDistributor"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-Distributor',true,200,finalResult,clientError.success.savedSuccessfully);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-Distributor',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Save-Distributor', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};