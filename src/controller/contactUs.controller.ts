import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { contact, contactDocument } from "../models/contactUs.model";
 
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
        response(req,res,activity,'Level-2','Save-Contactus',true,200, insertData,clientError.success.sendSuccessfully)
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
 * @author Vinodhagan P
 * @date 02-04-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function used to get all user contactUs details
 */
export let getAllContactUs = async(req,res,next)=>{
    try{
        const getContactUs =await contact.find({},{})
        response(req,res,activity,"level-1","fetch-allContactUs",true,200,getContactUs,clientError.success.fetchedSuccessfully)
    }
    catch(err){
        response(req,res,activity,"level-3","fetch-allContactUs",false,500,{},errorMessage.internalServer,err.message)
    }
}

/**
 * @author Dharani S
 * @date 02-04-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to find single user.
 */
export let getSingle = async( req, res, next ) =>{
    try {
            const single = await contact.findOne({ _id: req.query._id })
            if (single) {
                response(req, res, activity, 'Level-2', 'Fetch-user', true, 200, single, clientError.success.fetchedSuccessfully);
            } else {
                response(req, res, activity, 'Level-3', 'Fetch-User', true, 422, {}, clientError.user.userDontExist);
            }
            } 
    catch (err) {
            response(req, res, activity, 'Level-3', 'Fetch-User', false, 500, {}, errorMessage.internalServer, err.message);
    }
}