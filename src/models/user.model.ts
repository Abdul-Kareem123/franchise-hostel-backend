import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    _id?: any;
    name?: String;
    email?: String;
    mobileNumber?: Number;
    address?: String;
    city?: String;
    pinCode?: Number;
    otp?: Number;
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
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: Number },
    address: { type: String },
    city: { type: String },
    pinCode:{ type: Number },
    otp: { type: Number },
    bearer_Token: { type: String },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const User = mongoose.model("User", userSchema);