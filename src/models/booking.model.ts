import * as mongoose from "mongoose";

export interface IBooking extends mongoose.Document {
  customerName?: string;
  customerEmail?: string;
  room?: mongoose.Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
  status?: 'booked' | 'cancelled';
};

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  room: { type: mongoose.Types.ObjectId, ref: 'Room', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

export default mongoose.model<IBooking>('Booking', bookingSchema);