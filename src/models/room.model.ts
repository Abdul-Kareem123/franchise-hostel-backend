import * as mongoose from 'mongoose';

export interface IRoom extends mongoose.Document {
  number?: string;
  sharingType?: number;
  rent?: number;
  isAvailable?: boolean;
  availableFrom?: Date;
  availableTo?: Date;
  floor?: mongoose.Types.ObjectId;
}

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  sharingType: { type: Number, enum: [1, 2, 3, 4], required: true },
  rent: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  availableFrom: { type: Date, default: Date.now() },
  availableTo: {type: Date, default: null},
  floor: { type: mongoose.Types.ObjectId, ref: 'Floor' }
});

export default mongoose.model<IRoom>('Room', roomSchema);
