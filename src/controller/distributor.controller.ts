import { validationResult } from 'express-validator';
import { Distributor,DistributorDocument } from '../models/distributor.model';
import { Franchise } from '../models/franchise.model';
import { response } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';
import * as TokenManager from '../utils/tokenManager';
import { sendOtp } from '../helper/commonResponseHandler';

const activity = 'Distributor';

/**
 * @author Haripriyan K / BalajiMurahari
 * @date 13-04-2024
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
            const franchiseData = await Franchise.findOne({ $and: [{ isDeleted: false }, { mobileNumber: req.body.mobileNumber }] });
            if (!distributorData && !franchiseData) {
                const distributorDetails: DistributorDocument = req.body;
                const otp = Math.floor(1000 + Math.random() * 9000)
                distributorDetails.otp = otp;
                const createData = new Distributor(distributorDetails);
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
                finalResult["loginType"] = "distributor";
                finalResult["Distributor-Details"] = result;
                finalResult["token"] = token;
                sendOtp(insertData.mobileNumber,insertData.otp)
                response(req,res,activity,'Level-2','Save-Distributor',true,200,finalResult,clientError.success.savedSuccessfully);
            } else {
                response(req,res,activity,'Level-3','Save-Distributor',false,422,{},clientError.mobile.mobileExist);
            }
        } catch (err: any) {
            response(req,res,activity,'Level-3','Save-Distributor',false,500,{},errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity,  'Level-3','Save-Distributor', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};

/**
 * @author Haripriyan K
 * @date 13-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get Distributors list
 */
export let getAllDistributors = async (req, res, next) => {
    try {
        const distributorList = await Distributor.find({ isDeleted: false });
        response(req, res, activity, 'Level-2', 'Get-Distributor', true, 200, distributorList, clientError.success.success);
    } catch (err: any) {
        response(req, res, activity, 'Level-3', 'Get-Distributor', false, 500, {}, errorMessage.internalServer, err.message);
    }
}

/**
 * @author Haripriyan K
 * @date 13-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to update Distributor
 */
export let updateDistributor = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const distributorDetails: DistributorDocument = req.body;
            const distributorData = await Distributor.findOne({ $and: [ { _id: { $ne: distributorDetails._id }}, { mobileNumber: distributorDetails.mobileNumber }, { isDeleted: false }] });
            const franchiseData = await Franchise.findOne({ $and: [ { mobileNumber: distributorDetails.mobileNumber }, { isDeleted: false }] });
            if (!distributorData && !franchiseData) {
                const updateDistributor = new Distributor(distributorDetails) 
                let insertDistributor = await updateDistributor.updateOne({
                    $set: {
                        name: distributorDetails.name,
                        mobileNumber: distributorDetails.mobileNumber,
                        address: distributorDetails.address,
                        city: distributorDetails.city
                    }
                })
                response(req, res, activity, 'Level-2', 'Update-Distributor', true, 200, insertDistributor, clientError.success.updateSuccess);
            }
        } catch (err: any) {
            response(req, res, activity, 'Level-3', 'Update-Distributor', false, 500, {}, errorMessage.internalServer, err.message);
        }
    } else {
        response(req, res, activity, 'Level-3', 'Update-Distributor', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}