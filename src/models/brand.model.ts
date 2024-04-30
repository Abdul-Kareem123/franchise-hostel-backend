import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
    _id: any;
    distributorId: any;
    name: string;
    category: string;
    imageUrl: string;
    investmentAmount: string;
    status: number;
    isDeleted: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string
}

const BrandSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    distributorId: { type: mongoose.Types.ObjectId, ref:"Distributor" },
    name: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    investmentAmount: { type: String },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Brand = mongoose.model("Brand", BrandSchema);