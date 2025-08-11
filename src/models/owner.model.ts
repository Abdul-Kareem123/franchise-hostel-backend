import { Schema, model, Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IOwner {
  name: string;
  email: string;
  password: string;
  phone: string;
  buildings: Schema.Types.ObjectId[];
  comparePassword(candidate: string): Promise<boolean>;
}

export interface OwnerDocument extends IOwner, Document {
  _id: Schema.Types.ObjectId;
}

const ownerSchema = new Schema<OwnerDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  buildings: [{ type: Schema.Types.ObjectId, ref: 'Building' }]
});

ownerSchema.pre<OwnerDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ownerSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default model<OwnerDocument>('Owner', ownerSchema);
