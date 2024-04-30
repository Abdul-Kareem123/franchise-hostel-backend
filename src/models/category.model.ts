import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
    _id?: any;
    categoryName?: string;
    categoryImage?: string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}


const categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    categoryName: { type: String },
    categoryImage: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

export const Category = mongoose.model("Category", categorySchema);