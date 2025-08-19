import Owner from '../models/owner.model';
import jwt from 'jsonwebtoken';
import * as TokenManager from '../utils/tokenManager';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'login';

export const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email }).exec();
    if (!owner) {
    return response(req, res, activity, 'Level-2', 'Login-User', true, 404, { error: 'Invalid credentials' }, clientError.user.UserNotFound);        
    }

    const isMatch = await owner.comparePassword(password);
    if (!isMatch) {
    return response(req, res, activity, 'Level-2', 'Login-User', true, 401, {}, clientError.password.invalidPassword);
    }

    const token = TokenManager.CreateJWTToken({
        id: owner['_id'],
        role: 'owner'
    });
    return response(req, res, activity, 'Level-2', 'Login-User', true, 200, { token, owner }, clientError.success.loginSuccess);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'Login-User', false, 500, { error: 'Login failed' }, errorMessage.internalServer, error.message);
  }
};

activity = 'update-password';

export const resetPassword = async (req, res) => {

  try {
    const { email, newPassword } = req.body;

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return response(req, res, activity, "Level-2", "reset-password", false, 404, {}, errorMessage.notFound);
    }

    owner.password = newPassword;
    const result = await owner.save();
    return response(req, res, activity, "Level-3", "reset-password", true, 200, result, clientError.success.passwordUpdateSuccess);
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return response(req, res, activity, "Level-4", "reset-password", false, 500, {}, errorMessage.internalServer, error.message);
  }
};

