import * as mongoose from 'mongoose';

export interface IFloor extends mongoose.Document {
  number?: number;
  rooms?: mongoose.Types.ObjectId[];
  building?: mongoose.Types.ObjectId;
}

const floorSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  rooms: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
  building: [{ type: mongoose.Types.ObjectId, ref: 'Building' }]
});

export default mongoose.model<IFloor>('Floor', floorSchema);
