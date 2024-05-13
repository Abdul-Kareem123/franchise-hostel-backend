import mongoose from "mongoose";

export interface FranchiserDocument extends mongoose.Document {
    _id?: any;
    name?: String;
    email?: String;
    mobileNumber?: Number;
    companyName?: String;
    productName?: String;
    state?: String;
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
 
const franchiserSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true},
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: Number },
    companyName: { type: String },
    productName: { type: String },
    state: { type: String },
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

export const Franchiser = mongoose.model("Franchiser", franchiserSchema);