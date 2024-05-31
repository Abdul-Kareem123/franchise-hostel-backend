import mongoose from "mongoose";

export interface DistributorDocument extends mongoose.Document {
    _id?: any;
    name?: String;
    email?: String;
    mobileNumber?: Number;
    companyName?: String;
    productName?: String;
    imageUrl?: String;
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
 
const distributorSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true},
    name: { type: String },
    email: { type: String },
    mobileNumber: { type: Number },
    companyName: { type: String },
    productName: { type: String },
    imageUrl: { type: String },
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

export const Distributor = mongoose.model("Distributor", distributorSchema);