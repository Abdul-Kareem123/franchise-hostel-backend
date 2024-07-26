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
    walletAmount?: Number;
    bearer_Token?: String;
    order_amount?: Number;
    paymentOrder_id?: String;
    payment_amount?: Number;
    payment_message?: String;
    payment_completion_time?:String;
    payment_status?: String;
    payment_method?: any;
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

export const Distributor = mongoose.model("Distributor", distributorSchema);