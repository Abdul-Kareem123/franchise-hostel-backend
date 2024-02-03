import { validationResult } from 'express-validator';
import { Franchise,FranchiseDocument } from '../models/franchise.model';
import { response } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import {CreateJWTToken } from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';

const activity = 'FRANCHISE';


/**
 * @author BalajiMurahari
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
                createFranchise.otp = otp;
                const createData = new Franchise(createFranchise);
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
                finalResult["loginType"] = "franchise";
                finalResult["createFranchise"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-Franchise',true,200,finalResult,clientError.success.savedSuccessfully);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-Franchise',false,500,{},errorMessage.internalServer, err.message);
        }
            }
            else {
                response(req, res, activity,  'Level-3','Save-Franchise', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
            }
        }
    

