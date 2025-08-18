import Room from '../models/room.model';
import Owner, { IOwner } from '../models/owner.model';
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import { convertUTCToIST, response } from "../helper/commonResponseHandler";
import { clientError, errorMessage } from "../helper/ErrorMessage";
import * as TokenManager from '../utils/tokenManager';
import Booking from '../models/booking.model';

let activity = "Register";
const date = new Date();

export const registerOwner = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return response(req, res, activity, 'Level-1', 'user-room-booking', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
  //  };
  const { name, email, phone, password } = req.body;

  try {
    const existing = await Owner.findOne({ email });
    if (existing) return response(req, res, activity, 'Level-2', 'Register-Users', true, 422, { error: 'Email already registered' }, clientError.user.userExist);;

    const owner = await Owner.create({ name, email, phone, password });
    const token = TokenManager.CreateJWTToken({
      id: owner._id.toString(),
      role: 'owner'
    });
    return response(req, res, activity, 'Level-2', 'create-Users', true, 200, { token, owner }, clientError.success.registerSuccessfully);
  } catch (error) {
    return response(req, res, activity, 'Level-3', 'create-Users', true, 500, { error: 'Registration failed' }, errorMessage.internalServer, error.message);
  }
};

activity = 'All owners';

export const getAllOwnerData = async (req, res) => {
  try {
    const ownersData = await Owner.find({});
    response(req, res, activity, 'Level-2', 'owners-data', true, 200, ownersData, clientError.success.fetchedSuccessfully);

  } catch(error: any) {
    console.error('Error fetching owners-data:', error);
    response(req, res, activity, 'Level-3', 'owners-data', false, 500, { error: 'Error fetching owner-data' }, error.message);

  }
}
activity = 'update-room-availablity';

export const updateRoomAvailability = async (req, res) => {  
  const { roomId, isAvailable, availableFrom, availableTo } = req.body;

  try {
    const now = new Date();
    const room = await Room.findById(roomId);
    if (!room) return response(req, res, activity, 'Level-2', 'no-room', true, 404, { error: 'Room not found' }, errorMessage.notFound);

    if (isAvailable) {
      room.isAvailable = isAvailable,
      room.availableFrom = availableFrom ? new Date(availableFrom) : now,
      room.availableTo = availableTo ? new Date(availableTo) : null;

      const checking = await Booking.findOneAndUpdate(
        {room: roomId, status: 'cancelled'},
        {
          $set: {
            status: 'cancelled',
            startDate: now,
            endDate: null
          }
        },
        { new: true }
      );
    } else {
        room.isAvailable = false,
        room.availableTo = availableTo || now,
        await Booking.create({
          customerName: req.body?.customerName || null,
          customerEmail: req.body?.customerEmail || 'system@auto.com',
          room: room._id,
          startDate: now,
          endDate: room.availableTo,
          status: 'booked',
        })
    }
    await room.save();
    response(req, res, activity, 'Level-2', 'updated-roomAvailability', true, 200, { message: 'Room availability updated', room }, clientError.success.savedSuccessfully);
  } catch (error: any) {
      response(req, res, activity, 'Level-3', 'update-room', false, 500, { error: 'Error updating room' }, error.message);
  }
};

activity = 'owner-data';

export const getOwnerById = async (req, res, next) => {  
  const { id } = req.params;
  try {
    const ownerData = await Owner.findById({_id: id});
    if (!ownerData) {
      return response(req, res, activity, 'Level-2', 'owner-data', false, 404, { msg: 'owner not found' }, errorMessage.notFound);
    };
    response(req, res, activity, 'Level-3', 'owner-data', true, 200, ownerData, clientError.success.fetchedSuccessfully);

  } catch(error: any) {
    console.error('Error fetching owner-data:', error);
    response(req, res, activity, 'Level-4', 'owner-data', false, 500, { error: 'Error fetching owners-data' }, error.message);
  }

}

activity = 'update-owner-data';

export const updatedOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData: IOwner = req.body;
    const identity = req.user;
    const ownerData = await Owner.findById(id);
    if (!ownerData) {
      return response(req, res, activity, 'Level-2', 'owner-update', false, 404, { msg: 'owner not found' }, errorMessage.notFound);
    };
    if (identity.role !== 'admin') {
      if (identity.role === 'owner') {
        if (ownerData._id.toString() !== identity._id.toString()) {
          return response(req, res, activity, 'Level-2', 'owner-update', false, 403, { message: 'Not authorized to update this owner' }, errorMessage.cantChangestatus);
        }
      } else {
        return response(req, res, activity, 'Level-2', 'owner-update', false, 403, { message: 'Not authorized' }, errorMessage.cantChangestatus);
      }
    }
    const updateOwnerData = await Owner.findByIdAndUpdate(
      {_id: id},
      { $set: updateData, 
      modifiedOn: convertUTCToIST(date),
      modifiedBy: req.userId    
      },
      { new: true }
    );

    if (!updateOwnerData) {
      return response(req, res, activity, 'Level-2', 'owner-data-update', false, 404, { msg: 'owner not found' }, errorMessage.notFound);
    }
    response(req, res, activity, 'Level-3', 'owner-data', true, 200, updateOwnerData, clientError.success.updateSuccess);

  } catch (error: any) {
    console.error('Error updating owner-data:', error);
    response(req, res, activity, 'Level-4', 'owner-data', false, 500, { error: 'Error updating owner-data' }, error.message);
  }
};

activity = 'delete owner data';

export const deleteOwnerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const identity = req.user;
    const ownerData = await Owner.findById(id);
    if (!ownerData) {
      return response(req, res, activity, 'Level-2', 'owner-delete', false, 404, { msg: 'owner not found' }, errorMessage.notFound);
    };
    if (identity.role !== 'admin') {
      if (identity.role === 'owner') {
        if (ownerData._id.toString() !== identity._id.toString()) {
          return response(req, res, activity, 'Level-2', 'owner-delete', false, 403, { message: 'Not authorized to delete this owner' }, errorMessage.cantChangestatus);
        }
      } else {
        return response(req, res, activity, 'Level-2', 'owner-delete', false, 403, { message: 'Not authorized' }, errorMessage.cantChangestatus);
      }
    }
    const deletedOwner = await Owner.findByIdAndDelete({_id: id}, {
      $set: {
      isDeleted: true,
      modifiedOn: convertUTCToIST(date),
      modifiedBy: req.userId    
    }});

    if (!deletedOwner) {
      return response(req, res, activity, 'Level-2', 'Delete-Owner', true, 404, { message: 'Owner not found'}, errorMessage.notFound);
    };

    response(req, res, activity, 'Level-2', 'Delete-Owner', true, 200, deletedOwner, clientError.success.deleteSuccess);
  } catch (error: any) {
    console.error('Error deleting owner:', error);
    response(req, res, activity, 'Level-3', 'Delete-Owner', false, 500, { message: 'Error deleting owner' }, error.message);
  }
};

