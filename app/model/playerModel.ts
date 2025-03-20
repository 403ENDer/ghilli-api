import mongoose, { Schema } from "mongoose";

interface player {
  name: string;
  phone: number;
}

const PlayerSchema = new Schema<player>(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

export const PlayerModel =
  mongoose.models.players || mongoose.model<player>("players", PlayerSchema);
