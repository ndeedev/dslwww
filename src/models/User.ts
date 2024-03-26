// models/User.ts
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  role: { type: String, required: true, unique: false }
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
