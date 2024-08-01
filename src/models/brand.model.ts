import mongoose from "mongoose";

export interface BrandDocument extends mongoose.Document {
    _id?: any;
    distributorId?: any;
    brandName?: string;
    companyName?: string;
    ownerName?: string;
    ownerMobileNumber?: string;
    ownerEmail?: string;
    managerName?: string;
    managerMobileNumber?: string;
    managerEmail?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    pincode?: number;
    websiteLink?: string;
    lookingFor?: string;
    lookingForFranchisePartner?: string;
    unitInvestmentAmount?: number;
    unitFranchiseOrBrandfee?: number;
    unitRoyaltyOrCommissionfee?: number;
    investmentAmountOrCountrywise?: number;
    unitBrandfeeCountrywise?: number;
    masterBrandfeeCountrywise?: number;
    royaltyCommissionfeeCountrywise?: number;
    investmentAmountRegionwise?: number;
    unitBrandfeeRegionwise?: number;
    masterBrandfeeRegionwise?: number;
    royaltyCommissionfeeRegionwise?: number;
    category?: string;
    subCategory?: string;
    serviceOrProduct?: string;
    yearCommencedOperation?: Number;
    yearCommencedFranchising?: Number;
    noOfFranchiseOutlets?: string;
    noOfRetailOutlets?: string;
    noOfCompanyOwnedOutlets?: string;
    currentOutletsLocatedAt?: string;
    materialsAvailable?: string;
    describeYourBusiness?: string;
    imageUrl?: string;
    investmentAmount?: string;
    internationalExpansion?: Boolean;
    territorialRights?: Boolean;
    performanceGuarantee?: Boolean;
    leviesPayable?: Boolean;
    percentageReturn?: String;
    paybackPeriod?: any;
    investmentRequirement?: String;
    provideAidInFinancing?: Boolean;
    propertyIsRequired?: String;
    floorAreaRequiredMin?: String;
    floorAreaRequiredMax?: String;
    preferredLocation?: String;
    outfitOfPremises?: Boolean;
    siteSelectionAssistance?: Boolean;
    operatingManuals?: Boolean;
    franchiseTraining?: String;
    fieldAssistance?: Boolean;
    headOffice?: Boolean;
    itSystems?: Boolean;
    franchiseAgreement?: Boolean;
    contractDuration?: String;
    termRenewable?: Boolean;
    companyLogo?: String;
    companyImageSmall?: String;
    companyImageMedium?: String;
    companyBannerSmall?: String;
    companyBannerMedium?: String;
    videoLink?: String;
    gstNumber?: String;
    modeOfPayment?: String;
    Amount: number;
    coinDeduct: number;
    userList?: any;
    //---------my code
    companyBanner?:string;
    companyImages1?:string;
    companyImages2?:string;
    companyImages3?:string;
    status?: number;
    isDeleted?: boolean;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string
}

const BrandSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    distributorId: { type: mongoose.Types.ObjectId, ref: "Distributor" },
    brandName: { type: String },
    companyName: { type: String },
    ownerName: { type: String },
    ownerMobileNumber: { type: String },
    ownerEmail: { type: String },
    managerName: { type: String },
    managerMobileNumber: { type: String },
    managerEmail: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    pincode: { type: Number },
    websiteLink: { type: String },
    lookingFor: { type: String },
    lookingForFranchisePartner: { type: String },
    unitInvestmentAmount: { type: Number },
    unitFranchiseOrBrandfee: { type: Number },
    unitRoyaltyOrCommissionfee: { type: Number },
    investmentAmountOrCountrywise: { type: Number },
    unitBrandfeeCountrywise: { type: Number },
    masterBrandfeeCountrywise: { type: Number },
    royaltyCommissionfeeCountrywise: { type: Number },
    investmentAmountRegionwise: { type: Number },
    unitBrandfeeRegionwise: { type: Number },
    masterBrandfeeRegionwise: { type: Number },
    royaltyCommissionfeeRegionwise: { type: Number },
    category: { type: String },
    subCategory: { type: String },
    serviceOrProduct: { type: String },
    yearCommencedOperation: { type: Number },
    yearCommencedFranchising: { type: Number },
    noOfFranchiseOutlets: { type: String },
    noOfRetailOutlets: { type: String },
    noOfCompanyOwnedOutlets: { type: String },
    currentOutletsLocatedAt: { type: String },
    materialsAvailable: { type: String },
    describeYourBusiness: { type: String },
    imageUrl: { type: String },
    investmentAmount: { type: String },
    internationalExpansion: { type: Boolean },
    territorialRights: { type: Boolean },
    performanceGuarantee: { type: Boolean },
    leviesPayable: { type: Boolean },
    percentageReturn: { type: String },
    paybackPeriod: {
        minMonth: { type: Number },
        maxMonth: { type: Number }
    },
    investmentRequirement: { type: String },
    provideAidInFinancing: { type: Boolean },
    propertyIsRequired: { type: String },
    floorAreaRequiredMin: { type: String },
    floorAreaRequiredMax: { type: String },
    preferredLocation: { type: String },
    outfitOfPremises: { type: Boolean },
    siteSelectionAssistance: { type: Boolean },
    operatingManuals: { type: Boolean },
    franchiseTraining: { type: String },
    fieldAssistance: { type: Boolean },
    headOffice: { type: Boolean },
    itSystems: { type: Boolean },
    franchiseAgreement: { type: Boolean },
    contractDuration: { type: String },
    termRenewable: { type: Boolean },
    companyLogo: { type: String },
    companyImageSmall: { type: String },
    companyImageMedium: { type: String },
    companyBannerSmall: { type: String },
    companyBannerMedium: { type: String },
    videoLink: { type: String },
    gstNumber: { type: String },
    modeOfPayment: { type: String },
    Amount: { type: Number, default: 500 },
    coinDeduct: { type: Number },
    userList: [{
        userName: { type: String },
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
    }],
    companyBanner:{type:String},
    companyImages1:{type:String},
    companyImages2:{type:String},
    companyImages3:{type:String},   
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
})

export const Brand = mongoose.model("Brand", BrandSchema);