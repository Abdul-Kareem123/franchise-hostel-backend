import Floor from '../models/floor.model';
import Room from '../models/room.model';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'available rooms count';

export const roomsPerFloor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
        return response(req, res, activity, 'Level-1', 'rooms-per-floor', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    };
  try {
    const floors = await Floor.find().populate('rooms');
    const data = floors.map(floor => ({
      floorNumber: floor.number,
      totalRooms: floor.rooms.length,
      availableRooms: floor.rooms.filter((r: any) => r.isAvailable).length
    }));

    return response(req, res, activity, 'Level-2', 'rooms-per-floor', true, 200, data, clientError.success.fetchedSuccessfully);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'rooms-per-floor', false, 500, { error: 'Error fetching dashboard data' }, error.message);
  }
};
