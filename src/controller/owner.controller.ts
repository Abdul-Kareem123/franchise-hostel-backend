import Room from '../models/room.model';
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'update-room-availablity';

export const updateRoomAvailability = async (req: Request, res: Response) => {
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {
    return response(req, res, activity, 'Level-1', 'room-update', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  }
  
  const { roomId, isAvailable } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) return response(req, res, activity, 'Level-2', 'no-room', true, 404, { error: 'Room not found' }, errorMessage.notFound);

    room.isAvailable = isAvailable;
    await room.save();
    return response(req, res, activity, 'Level-2', 'updated-roomAvailability', true, 200, { message: 'Room availability updated', room }, clientError.success.savedSuccessfully);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'update-room', false, 500, { error: 'Error updating room' }, error.message);
  }
};
