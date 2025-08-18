import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export interface IOwner extends mongoose.Document {
  _id?: any,
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  buildings?: mongoose.Types.ObjectId[];
  comparePassword(candidate: string): Promise<boolean>;
}

const ownerSchema = new mongoose.Schema({
  _id: {type: mongoose.Types.ObjectId, required: true, auto: true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  buildings: { type: mongoose.Types.ObjectId, ref: 'Building' }
});

ownerSchema.pre<IOwner>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ownerSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IOwner>('Owner', ownerSchema);
