import mongoose from "mongoose";

export interface contactDocument extends mongoose.Document{
    _id?:any;
    fullName?:string;
    companyName?:string;
    mobileNumber?:number;
    emailAddress?:string;
    pincode?:number;
    subject?:string;
    message?:string;
    isDeleted?:boolean;
    createdBy?:any;
    createdOn?:Date;
    modifiedOn?:Date;
    modifiedBy?:any;
    
}

const contactSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId, auto:true},
    fullName:{type:String },
    companyName:{type:String},
    mobileNumber:{type:Number},
    emailAddress:{type:String, lowercase:true, trim:true},
    pincode:{type:Number},
    subject:{type:String},
    message:{type:String},
    isDeleted:{type:Boolean, default:false},
    createdBy:{type:mongoose.Types.ObjectId},
    createdOn:{type:Date,default:Date.now},
    modifiedOn:{type:Date},
    modifiedBy:{type:mongoose.Types.ObjectId},
   
})

export const contact = mongoose.model("Contact us",contactSchema)