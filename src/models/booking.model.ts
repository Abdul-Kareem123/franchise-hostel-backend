import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
  customerName: string;
  customerEmail: string;
  room: Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'booked' | 'cancelled';
}

const bookingSchema = new Schema<IBooking>({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

export default model<IBooking>('Booking', bookingSchema);