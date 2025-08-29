import Building, { IBuilding } from '../models/building.model';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response, convertUTCToIST } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";

let activity = 'All building Data';

const date = new Date();

export const getAllBuildings = async (req, res, next) => {
//  const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//         return response(req, res, activity, 'Level-1', 'fetching-data', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
//   };    
  try {
    const buildings = await Building.find().populate('owner', 'name email');
    response(req, res, activity, 'Level-2', 'owners-data', true, 200, buildings, clientError.success.fetchedSuccessfully);
  } catch (error: any) {
    console.error('Error fetching buildings:', error);
     response(req, res, activity, 'Level-3', 'owners-data', false, 500, { error: 'Error fetching buildings' }, error.message);
  }
};

activity = 'single building data';

export const getBuildingById = async (req, res) => {
  const { id } = req.params;
  try {
    const buildingData = await Building.findById({_id: id}).populate('owner', 'name email');
    if (!buildingData) {
      return response(req, res, activity, 'Level-2', 'owner-data', false, 404, { msg: 'Building not found' }, errorMessage.notFound);
    };
    response(req, res, activity, 'Level-3', 'owner-data', true, 200, buildingData, clientError.success.fetchedSuccessfully);

  } catch(error: any) {
    console.error('Error fetching building:', error);
    response(req, res, activity, 'Level-4', 'building-data', false, 500, { error: 'Error fetching building' }, error.message);
  }

}

activity = 'update single building data';

export const updateBuilding = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData: IBuilding = req.body;
    const identity = req.user;
    const building = await Building.findById(id).populate('owner', '_id name');
    if (!building) {
      return response(req, res, activity, 'Level-2', 'building-data-update', false, 404, { msg: 'Building not found' }, errorMessage.notFound);
    };
    if (identity.role !== 'admin') {
      if (identity.role === 'owner') {
        if (building.owner._id.toString() !== identity._id.toString()) {
          return response(req, res, activity, 'Level-2', 'building-data-update', false, 403, {message: 'Not authorized to update this building' }, errorMessage.cantChangestatus);
        }
      } else {
          return response(req, res, activity, 'Level-2', 'building-data-update', false, 403, {message: 'Not authorized' }, errorMessage.cantChangestatus);
      }
    }

    const updatedBuilding = await Building.findByIdAndUpdate(
      {_id: id},
      { $set: updateData, 
      modifiedOn: convertUTCToIST(date),
      modifiedBy: req.userId    
      },
      { new: true }
    );

    if (!updatedBuilding) {
      return response(req, res, activity, 'Level-2', 'building-data-update', false, 404, { msg: 'Building not found' }, errorMessage.notFound);
    }
    response(req, res, activity, 'Level-3', 'building-data-update', true, 200, updatedBuilding, clientError.success.updateSuccess);

  } catch (error: any) {
    console.error('Error updating building:', error);
    response(req, res, activity, 'Level-4', 'building-data-update', false, 500, { error: 'Error updating building' }, error.message);
  }
};

activity = 'delete building data';

export const deleteBuildingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const identity = req.user;
    const building = await Building.findById(id).populate('owner', '_id name');
    if (!building) {
      return response(req, res, activity, 'Level-2', 'building-data-update', false, 404, { msg: 'Building not found' }, errorMessage.notFound);
    };
    if (identity.role !== 'admin') {
      if (identity.role === 'owner') {
        if (building.owner._id.toString() !== identity._id.toString()) {
          return response(req, res, activity, 'Level-2', 'building-data-delete', false, 403, { message: 'Not authorized to delete this building' }, errorMessage.cantChangestatus);
        }
      } else {
        return response(req, res, activity, 'Level-2', 'building-data-delete', false, 403, { message: 'Not authorized' }, errorMessage.cantChangestatus);
      }
    }
    const deletedBuilding = await Building.findByIdAndUpdate({ _id: id }, {
      $set: {
        isDeleted: true,
        modifiedOn: convertUTCToIST(date),
        modifiedBy: req.userId
      }
    });

    if (!deletedBuilding) {
      return response(req, res, activity, 'Level-2', 'Delete-Building', true, 404, { message: 'Building not found' }, errorMessage.notFound);
    };

    response(req, res, activity, 'Level-2', 'Delete-Building', true, 200, deletedBuilding, clientError.success.deleteSuccess);
  } catch (error: any) {
    console.error('Error deleting building:', error);
    response(req, res, activity, 'Level-3', 'Delete-Building', false, 500, { message: 'Error deleting building' }, error.message);
  }
};


activity = 'delete buildings data';

export const deleteMultipleBuildings = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return response(req, res, activity, 'Level-2', 'Delete-Buildings', false, 400, { message: 'No building IDs provided'}, errorMessage.notFound);
    }
    const result = await Building.deleteMany({ _id: { $in: ids } });
    const reqResult = {
      message: `${result.deletedCount} building(s) deleted successfully`
    }
    response(req, res, activity, 'Level-2', 'Delete-Buildings', true, 200, reqResult, clientError.success.deleteSuccess);
  } catch (error) {
    console.error('Error deleting buildings:', error);
    response(req, res, activity, 'Level-3', 'Delete-Buildings', false, 500, { message: 'Error deleting buildings' }, error.message);
  }
}
