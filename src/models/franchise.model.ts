import mongoose from "mongoose";

export interface FranchiseDocument extends mongoose.Document {
    _id?: any;
    distributorId?: any;
    franchiseName?: string;
    category?: string;
    subCategory?: string;
    brochure?: string;
    areaRequired?: string;
    gstNumber?: string;
    noOfOutlets?: number;
    establishedYear?: number;
    lookingForInvestor?: boolean;
    brand?: string
    location?: string;
    description?: string;
    image?: string;
    rateOfInterest?: number;
    investmentAmount?: any;
    specialFeatures?: string;
    email?: string;
    status?: number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string
}

const FranchiseSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    distributorId: { type: mongoose.Types.ObjectId, ref:"Distributor" },
    franchiseName: { type: String },
    category: { type: String },
    subCategory: { type: String },
    brochure: { type: String },
    areaRequired: { type: String },
    gstNumber: { type: String },
    noOfOutlets: { type: Number },
    establishedYear: { type: Number },
    lookingForInvestor: { type: Boolean },
    brand: [{ type: String }],
    location: { type: String },
    description: { type: String },
    image: { type: String },
    rateOfInterest: { type: Number },
    investmentAmount: { 
        minAmount: { type: Number },
        maxAmount: { type: Number }
    },
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