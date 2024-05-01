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
 * @date 25-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to post Franchise or create franchise
 */
export const createFranchise = async (req,res,next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try{
            const franchiseData = await Distributor.findOne({ $and: [{ isDeleted: false }, { _id: req.body.distributorId }] });
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