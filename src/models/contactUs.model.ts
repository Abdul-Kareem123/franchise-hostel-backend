import mongoose from "mongoose";
 
export interface contactDocument extends mongoose.Document{
    _id?: any;
    fullName?: string;
    companyName?: string;
    mobileNumber?: number;
    emailAddress?: string;
    pincode?: number;
    brandId?:any;
    subject?: string;
    message?: string;
    isDeleted?: boolean ;
    createdOn?: Date
    createdBy?: string
    modifiedOn?: Date
    modifiedBy?: string
}
 
const contactSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    fullName: { type: String },
    companyName: { type: String },
    mobileNumber: { type: Number },
    emailAddress: { type: String, lowercase: true, trim: true },
    pincode:{ type: Number },
    brandId:{type:mongoose.Types.ObjectId , ref:'Brand'},
    subject:{ type: String },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
   
})
 
export const contact = mongoose.model("Contact us",contactSchema)