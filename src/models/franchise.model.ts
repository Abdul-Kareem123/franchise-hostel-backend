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
    walletAmount?: Number;
    bearer_Token?: String;
    order_amount?: Number;
    paymentOrder_id?: String;
    payment_amount?: Number;
    payment_message?: String;
    payment_completion_time?:String;
    payment_status?: String;
    payment_method?: any;
    status?: number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string
}

const FranchiseSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    franchiseId: { type: mongoose.Types.ObjectId, },
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
    walletAmount: { type: Number },
    bearer_Token: { type: String },
    order_amount: { type: Number },
    paymentOrder_id: { type: String },
    payment_amount: { type: Number },
    payment_message: { type: String },
    payment_completion_time:{type:String},
    payment_status: { type: String },
    payment_method: {
            upi: {
                   channel: { type: String },
                   upi_id: { type: String }
                 },
            card: {
                  channel: {type:String},
                  card_number: {type:String},
                  card_network: {type:String},
                  card_type:  {type:String},
                  card_country: {type:String},
                  card_bank_name:  {type:String},
                  card_sub_type: {type:String}
             }
        },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Franchise = mongoose.model("Franchise", FranchiseSchema);