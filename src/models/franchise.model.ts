import mongoose from "mongoose";
// Get current UTC time in milliseconds
const utcTime = Date.now();

// Calculate the offset for IST (UTC + 5 hours 30 minutes)
const offset = 5.5 * 60 * 60 * 1000;

// Convert UTC time to IST
export const istTime = new Date(utcTime + offset);

// Display the time in IST
// console.log(istTime);

export interface FranchiseDocument extends mongoose.Document {
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


const FranchiseSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId,auto:true},
    emailAddress:{type:String },
    mobileNumber:{type:Number},
    productName:{type:String},
    typeYourRequirement:{type:String},
    otp:{type:Number},
    status: {type:Number,default:1},
    isDeleted: {type: Boolean,default: false},
    createdOn: {type: Date,default:istTime},
    createdBy: {type: String},
    modifiedOn: {type: Date},
    modifiedBy: {type: String},
    
})


export const Franchise = mongoose.model("Franch", FranchiseSchema);

