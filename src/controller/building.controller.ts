import Building from '../models/building.model';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'All owners Data';

export const getAllBuildings = async (req: Request, res: Response) => {
 const errors = validationResult(req);
  if (!errors.isEmpty()) {
        return response(req, res, activity, 'Level-1', 'fetching-data', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    };    
  try {
    const buildings = await Building.find().populate('owner', 'name email');
    return response(req, res, activity, 'Level-2', 'owners-data', true, 200, buildings, clientError.success.fetchedSuccessfully);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    return response(req, res, activity, 'Level-3', 'owners-data', false, 500, { error: 'Error fetching buildings' }, error.message);
  }
};
