import mongoose from "mongoose";

export interface FranchiseDocument extends mongoose.Document {
    _id: any;
    franchiserId: any;
    franchiseName: string;
    category: string;
    subCategory: string;
    brand: string
    location: string;
    description: string;
    image: string;
    rateOfInterest: number;
    investmentAmount: number;
    specialFeatures: string;
    email: string;
    status: number;
    isDeleted: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string
}

const FranchiseSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    franchiserId: { type: mongoose.Types.ObjectId, ref:"Franchiser" },
    franchiseName: { type: String },
    category: { type: String },
    subCategory: { type: String },
    brand: [{ type: String }],
    location: { type: String },
    description: { type: String },
    image: { type: String },
    rateOfInterest: { type: Number },
    investmentAmount: { type: Number },
    specialFeatures: { type: String },
    email: { type: String },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Franchise = mongoose.model("Franchise", FranchiseSchema);