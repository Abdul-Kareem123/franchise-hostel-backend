import * as mongoose from 'mongoose';

export interface IBuilding extends mongoose.Document {
  name?: string;
  address?: string;
  isDeleted?: boolean;
  floors: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
}

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  floors: [{ type: mongoose.Types.ObjectId, ref: 'Floor' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'Owner' },
  isDeleted: { type: Boolean, default: false },
  createdOn: { type: Date },
  createdBy: { type: String },
  modifiedOn: { type: Date },
  modifiedBy: { type: String }
});

export default mongoose.model<IBuilding>('Building', buildingSchema);
