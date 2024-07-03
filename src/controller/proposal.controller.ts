import { validationResult } from "express-validator";
import { response } from "../helper/commonResponseHandler";
import { clientError,errorMessage } from "../helper/ErrorMessage";
import { Brand } from "../models/brand.model";
import { Proposal, ProposalDocument } from "../models/proposal.model";
 
var activity="send Proposal"
 
/**
 * @author Kaaviyan G S
 * @date 02-07-2024
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to create contact us
 */
 
export let createProposal = async(req,res,next)=>{
const errors = validationResult(req)
if(errors.isEmpty){
    try {
        const ProposalDetails:ProposalDocument = req.body;
        const createData = new Proposal(ProposalDetails)
        const insertData = await createData.save()
        if (insertData) {
            const data = await Brand.findByIdAndUpdate({_id:insertData.brandId},{$inc:{Amount:-10}})
            response(req,res,activity,'Level-2','Save-proposal',true,200, insertData,clientError.success.sendSuccessfully)
        } else {
            response(req,res,activity,'Level-3','Save-proposal',false,422,{},clientError.user.UserNotFound)
        }
    }
    catch (error) {
        response(req,res,activity,'Level-3','Save-proposal',false,500,{},errorMessage.internalServer,error.message)
    }
}
    else{
       response(req,res,activity,'Level-3','Save-proposal',false,422,{},errorMessage.fieldValidation,JSON.stringify(errors.mapped))
    }
}