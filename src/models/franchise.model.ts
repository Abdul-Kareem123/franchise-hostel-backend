import mongoose from "mongoose";

export interface FranchiseDocument extends mongoose.Document {
    _id: any;
    distributorId: any;
    name: string;
    category: string;
    location: string;
    description: string;
    image: string;
    rateOfInterest: number;
    investmentAmount: number;
    specialFeatures: string;
    mobileNumber: number;
    emailAddress: string;
    status: number;
    isDeleted: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string
}

const FranchiseSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    distributorId: { type: mongoose.Types.ObjectId, ref:"Distributor" },
    name: { type: String },
    category: { type: String },
    location: { type: String },
    description: { type: String },
    image: { type: String },
    rateOfInterest: { type: Number },
    investmentAmount: { type: Number },
    specialFeatures: { type: String },
    mobileNumber: { type: Number },
    emailAddress: { type: String },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Franchise = mongoose.model("Franchise", FranchiseSchema);