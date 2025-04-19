import mongoose, { Schema } from "mongoose";

interface tournament {
  name: string;
  location: string;
  createdBy: mongoose.ObjectId;
  startDate: Date;
  endDate: Date;
}

const tournamentSchema = new Schema<tournament>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const tournamentModel =
  mongoose.models.tournament || mongoose.model("tournament", tournamentSchema);
