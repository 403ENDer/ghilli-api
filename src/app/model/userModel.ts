import mongoose, { Schema } from 'mongoose';

interface user {
  name: string;
  email: string;
  // password: string;
  phone: number;
}

const userSchema = new Schema<user>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    // password: { type: String },
    phone: { type: Number, unique: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.user || mongoose.model('user', userSchema);
