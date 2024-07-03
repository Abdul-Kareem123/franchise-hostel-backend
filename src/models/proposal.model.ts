import mongoose from "mongoose";
 
export interface ProposalDocument extends mongoose.Document{
    _id?: any;
    name?: string;
    phone?: number;
    email?: string;
    pincode?: number;
    brandId?:any;
    location?: string;
    duration?: number;
    inverstmentRange?: string;
    isDeleted?: boolean ;
    createdOn?: Date
    createdBy?: string
    modifiedOn?: Date
    modifiedBy?: string
}
 
const proposalSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: { type: String },
    phone: { type: Number },
    email: { type: String, lowercase: true, trim: true },
    pincode:{ type: Number },
    brandId:{type:mongoose.Types.ObjectId , ref:'Brand'},
    location:{ type: String },
    duration:{type:Number},
    inverstmentRange: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
   
})
 
export const Proposal = mongoose.model("Proposal",proposalSchema)