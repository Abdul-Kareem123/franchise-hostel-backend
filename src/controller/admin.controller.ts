import { convertUTCToIST } from 'src/helper/commonResponseHandler';
import { User, UserDocument } from '../models/user.model';
import * as TokenManager from '../utils/tokenManager';
import { response, sendOtp } from '../helper/commonResponseHandler';
import { errorMessage, clientError } from '../helper/ErrorMessage';

let activity = 'admin';

const registerOwner = async (req, res, next) => {
    const { name, email, mobileNumber } = req.body;    
    try {
    const adminData = await User.findOne({ $and: [{isDeleted: false}, { mobileNumber: mobileNumber}]});
    if (adminData) {
       return response(req,res,activity,'Level-3','Save-User',false,422,{} , clientError.mobile.mobileExist);
    }

    const date = new Date();
    const adminDetails: UserDocument = req.body
    adminDetails.createdOn = convertUTCToIST(date);
    const otp = Math.floor(1000 + Math.random() * 9000);
    adminDetails.otp = otp;
    adminDetails.role = 'admin';
    const createAdmin = new User(adminDetails);
    const insertData = await createAdmin.save();
    const token = await TokenManager.CreateJWTToken({
        id: insertData['_id'],
        role: insertData['role']
    });
    const result = {};
    result['_id'] = insertData['_id'];
    result['mobileNumber'] = insertData['mobileNumber'];
    result['otp'] = insertData['otp'];
    let finalResult = {};
    finalResult["loginType"] = "admin";
    finalResult["User-Details"] = result;
    finalResult["token"] = token;
    sendOtp(insertData.mobileNumber,insertData.otp);
    response(req,res,activity,'Level-2','Save-Admin',true,200,finalResult,clientError.success.savedSuccessfully);
    } catch (error: any) {
        response(req,res,activity,'Level-3','Save-Admin',false,500,{}, errorMessage.internalServer, error.message);    
    }
}

activity = 'login';
export const loginAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({$and: [{isDeleted: false}, { mobileNumber: req.body.mobileNumber }]});
    if (!admin) {
      return response(req, res, activity, 'Level-2', 'Login-Admin', true, 404, { error: 'Invalid credentials' }, clientError.user.UserNotFound);        
    }

    let otp = Math.floor(1000 + Math.random() * 9000);
    admin.otp = otp;
    const token = await TokenManager.CreateJWTToken({
        id: admin["_id"],
        role: admin["role"] 
    });
    sendOtp(req.body.mobileNumber, otp);
    response(req, res, activity, 'Level-2', 'Login-Admin', true, 200, { token, admin }, clientError.success.loginSuccess);
  } catch (error: any) {
    response(req, res, activity, 'Level-3', 'Login-Admin', false, 500, { error: 'Login failed' }, errorMessage.internalServer, error.message);
  }
};