import mongoose from "mongoose";

export interface DistributorDocument extends mongoose.Document {
    _id?:any;
    name?:String;
    email?:String;
    mobileNumber?:Number;
    companyName?:String;
    productName?:String;
    pincode?:Number
    typeYourRequirement?:String;
    otp?:Number;
    status?:Number;
    isDeleted?:Boolean;
    bearer_Token?:String
    createdOn?:Date;
    createdBy?:String;
    modifiedOn?:Date;
    modifiedBy?:String;
}


const distributorSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,auto:true},
    name:{type:String},
    email:{type:String,lowercase:true,trim:true},
    mobileNumber:{type:Number},
    companyName:{type:String},
    productName:{type:String},
    pincode:{type:Number},
    typeYourRequirement:{type:String},
    otp:{type:Number},
    status: {type:Number,default:1},
    isDeleted: {type: Boolean,default: false},
    bearer_Token:{type:String},
    createdOn: {type: Date},
    createdBy: {type: String},
    modifiedOn: {type: Date},
    modifiedBy: {type: String},
    
})


export const Distributor = mongoose.model("Distributor", distributorSchema);

