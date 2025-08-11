import { Schema, model, Document } from 'mongoose';

export interface IFloor extends Document {
  number: number;
  rooms: Schema.Types.ObjectId[];
  building: Schema.Types.ObjectId;
}

const floorSchema = new Schema<IFloor>({
  number: { type: Number, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  building: [{ type: Schema.Types.ObjectId, ref: 'Building' }]
});

export default model<IFloor>('Floor', floorSchema);
