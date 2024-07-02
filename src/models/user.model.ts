import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    _id?: any;
    name?: String;
    userId?:any;
    email?: String;
    mobileNumber?: Number;
    address?: String;
    state?: String;
    pinCode?: Number;
    otp?: Number;
    notification?: any[];
    bearer_Token?: String;
    status?: Number;
    isDeleted?: Boolean;
    createdOn?: Date;
    createdBy?: String;
    modifiedOn?: Date;
    modifiedBy?: String;
}
 
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true},
    userId:{type:mongoose.Types.ObjectId},
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: Number },
    address: { type: String },
    state: { type: String },
    pinCode:{ type: Number },
    otp: { type: Number },
    notification:[{
        title:{ type: String },
        description:{ type: String }, 
        data:{ type: String }, 
        createdOn:{ type:Date }
    }],
    bearer_Token: { type: String },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const User = mongoose.model("User", userSchema);