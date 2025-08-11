import Owner from '../models/owner.model';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as TokenManager from '../utils/tokenManager';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = "Register";

export const registerOwner = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return response(req, res, activity, 'Level-1', 'user-room-booking', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
   };
  const { name, email, phone, password } = req.body;

  try {
    const existing = await Owner.findOne({ email });
    if (existing) return response(req, res, activity, 'Level-2', 'Register-Users', true, 422, { error: 'Email already registered' }, clientError.user.userExist);;

    const owner = await Owner.create({ name, email, phone, password });
    const token = TokenManager.CreateJWTToken(owner._id.toString());
    return response(req, res, activity, 'Level-2', 'create-Users', true, 200, { token, owner }, clientError.success.registerSuccessfully);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'create-Users', true, 500, { error: 'Registration failed' }, errorMessage.internalServer, error.message);
  }
};

activity = 'login';

export const loginOwner = async (req: Request, res: Response) => {
 const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return response(req, res, activity, 'Level-1', 'user-room-booking', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
   };    
  const { email, password } = req.body;
  try {
    const owner = await Owner.findOne({ email }).exec();
    if (!owner) {
    return response(req, res, activity, 'Level-2', 'Login-User', true, 404, { error: 'Invalid credentials' }, clientError.user.UserNotFound);        
    }

    const isMatch = await owner.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
    return response(req, res, activity, 'Level-2', 'Login-User', true, 401, {}, clientError.password.invalidPassword);
    }

    const token = TokenManager.CreateJWTToken(owner._id.toString());
    return response(req, res, activity, 'Level-2', 'Login-User', true, 200, { token, owner }, clientError.success.loginSuccess);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'Login-User', false, 500, { error: 'Login failed' }, errorMessage.internalServer, error.message);
  }
};
