import { validationResult } from "express-validator";
import Room from '../models/room.model';
import Booking from '../models/booking.model';
import { Request, Response } from 'express';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'room-availablity';

export const checkAvailability = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return response(req, res, activity, 'Level-1', 'room-check', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  }

  const { roomId, startDate, endDate } = req.query;
  
  try {
    const overlappingBooking = await Booking.findOne({
      room: roomId,
      startDate: { $lt: new Date(endDate as string) },
      endDate: { $gt: new Date(startDate as string) },
    });

    const available = !overlappingBooking;

    return response(req, res, activity, 'Level-2', 'room-overlap', true, 200, { available }, clientError.success.success);
  } catch (error: any) {
    return response(req, res, activity, 'Level-3', 'room-overlap', false, 500, { available: false }, error.message);
  }
};


export const getAllAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'floor',
        populate: {
          path: 'building',
          select: 'name address'
        }
      });
    const formatted = rooms.map(room => ({
      id: room._id,
      number: room.number,
      sharingType: room.sharingType,
      rent: room.rent,
      floor: (room.floor as any)?.number,
      building: (room.floor as any)?.building?.name,
      address: (room.floor as any)?.building?.address
    }));

    return response(req, res, activity, 'Level-2', 'room-overlap', true, 200, formatted, clientError.success.success);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return response(req, res, activity, 'Level-3', 'room-overlap', false, 500, { error: 'Error fetching available rooms' }, error.message);
  }
};

