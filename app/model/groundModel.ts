import mongoose, { Schema } from "mongoose";

interface ground {
  name: string;
  location: string;
}

const groundSchema = new Schema<ground>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export const GroundModel =
  mongoose.models.grounds || mongoose.model("grounds", groundSchema);
