import mongoose from "mongoose";

export interface DistributorDocument extends mongoose.Document {
    _id?:any;
    emailAddress?:String;
    mobileNumber?:Number;
    productName?:String;
    typeYourRequirement?:String;
    otp?:Number;
    status?:Number;
    isDeleted?:Boolean;
    createdOn?:Date;
    createdBy?:String;
    modifiedOn?:Date;
    modifiedBy?:String;
}


const distributorSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,auto:true},
    emailAddress:{type:String},
    mobileNumber:{type:Number},
    productName:{type:String},
    typeYourRequirement:{type:String},
    otp:{type:Number},
    status: {type:Number,default:1},
    isDeleted: {type: Boolean,default: false},
    createdOn: {type: Date},
    createdBy: {type: String},
    modifiedOn: {type: Date},
    modifiedBy: {type: String},
    
})


export const Distributor = mongoose.model("Distributor", distributorSchema);

