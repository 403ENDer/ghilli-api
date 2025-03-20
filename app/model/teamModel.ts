import mongoose, { Schema } from "mongoose";

interface team {
  name: string;
  locality: string;
  ownerId: mongoose.ObjectId;
  player: [];
}

const teamSchema = new Schema<team>(
  {
    name: { type: String, requried: true },
    locality: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
      required: true,
    },
    player: [
      { type: mongoose.Schema.Types.ObjectId, ref: "player", required: true },
    ],
  },
  { timestamps: true }
);

export const teamModel =
  mongoose.models.teams || mongoose.model("teams", teamSchema);
