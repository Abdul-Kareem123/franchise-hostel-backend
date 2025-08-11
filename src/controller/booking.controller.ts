import Booking from '../models/booking.model';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'room-booking';

export const createBooking = async (req: Request, res: Response) => {
  const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return response(req, res, activity, 'Level-1', 'user-room-booking', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
   };
  const { customerName, customerEmail, room, startDate, endDate } = req.body;

  try {
    const overlappingBooking = await Booking.findOne({
      room,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) }
    });

    if (overlappingBooking) {
      return response(req, res, activity, 'Level-2', 'no-room', true, 400, { error: 'Room is already booked for those dates' }, errorMessage.notFound);
    };

    const booking = new Booking({
      customerName,
      customerEmail,
      room,
      startDate,
      endDate
    });

    await booking.save();
    return response(req, res, activity, 'Level-2', 'room-booked', true, 201, booking, clientError.success.savedSuccessfully);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'user-room-booking', false, 500, { error: 'Error creating booking' }, error.message);
  }
};
