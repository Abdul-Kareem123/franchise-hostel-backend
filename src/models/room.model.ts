import { Schema, model, Document } from 'mongoose';

export interface IRoom extends Document {
  number: string;
  sharingType: number;
  rent: number;
  isAvailable: boolean;
  floor: Schema.Types.ObjectId;
}

const roomSchema = new Schema<IRoom>({
  number: { type: String, required: true },
  sharingType: { type: Number, enum: [1, 2, 3, 4], required: true },
  rent: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  floor: { type: Schema.Types.ObjectId, ref: 'Floor' }
});

export default model<IRoom>('Room', roomSchema);
