import { Schema, model, Document } from 'mongoose';

export interface IBuilding extends Document {
  name: string;
  address: string;
  floors: Schema.Types.ObjectId[];
  owner: Schema.Types.ObjectId;
}

const buildingSchema = new Schema<IBuilding>({
  name: { type: String, required: true },
  address: { type: String },
  floors: [{ type: Schema.Types.ObjectId, ref: 'Floor' }],
  owner: { type: Schema.Types.ObjectId, ref: 'Owner' }
});

export default model<IBuilding>('Building', buildingSchema);
