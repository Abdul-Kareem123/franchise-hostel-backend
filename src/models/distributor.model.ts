import mongoose from "mongoose";
// Get current UTC time in milliseconds
const utcTime = Date.now();

// Calculate the offset for IST (UTC + 5 hours 30 minutes)
const offset = 5.5 * 60 * 60 * 1000;

// Convert UTC time to IST
export const istTime = new Date(utcTime + offset);

// Display the time in IST
// console.log(istTime);

export interface DistributorDocument extends mongoose.Document {
    _id?:any;
    name?:String;
    email?:String;
    mobileNumber?:Number;
    companyName?:String;
    productName?:String;
    address?:String;
    city?:String;
    pinCode?:Number;
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
    name:{type:String},
    email:{type:String},
    mobileNumber:{type:Number},
    companyName:{type:String},
    productName:{type:String},
    address:{type:String},
    city:{type:String},
    pinCode:{type:Number},
    otp:{type:Number},
    status: {type:Number,default:1},
    isDeleted: {type: Boolean,default: false},
    createdOn: {type: Date,default:istTime},
    createdBy: {type: String},
    modifiedOn: {type: Date},
    modifiedBy: {type: String},
})

export const Distributor = mongoose.model("Distributor", distributorSchema);