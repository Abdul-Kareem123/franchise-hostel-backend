import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { contact, contactDocument } from "../models/contactus.model";

var activity="contact us"

/**
 * @author Dharani S  
 * @author Vinodhagan P
 * @date 01-04-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to create contact us 
 */

export let contactUs = async(req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty){
    try {
        const contactDetails:contactDocument = req.body;
        const createData = new contact(contactDetails)
        const insertData = await createData.save()
        response(req,res,activity,'Level-2','Save-Contactus',true,200,insertData,clientError.success.registerSuccessfully)
    }
  catch (error) {
        response(req,res,activity,'Level-3','Save-Contactus',false,500,{},errorMessage.internalServer,error.message)
    }
}
    else{
       response(req,res,activity,'Level-3','Save-Contactus',false,422,{},errorMessage.fieldValidation,JSON.stringify(errors.mapped))
    }
}

/**
 * @author Dharani S  
 * @date 01-04-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get single user. 
 */
export let getSingleUser = async(req,res,next)=>{
try{
    const getsingle = await contact.findOne( { _id: req.query._id })
    if (getsingle) {
        response(req, res, activity, 'Level-2', 'Contactus-getSingle', true, 200, getsingle, clientError.success.fetchedSuccessfully);
    } else {
        response(req, res, activity, 'Level-3', 'Contactus-getSingle', true, 422, {}, clientError.user.userDontExist);
    }
}catch(err){
        response(req, res, activity, 'Level-3', 'Contactus-getSingle', false, 500, {}, errorMessage.internalServer, err.message);
    }
}
