import mongoose, { Schema } from "mongoose";

interface team {
  name: string;
  location: string;
  ownerId: mongoose.ObjectId;
  players: [];
}

const teamSchema = new Schema<team>(
  {
    name: { type: String, requried: true },
    location: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
      required: true,
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "player" }],
  },
  { timestamps: true }
);

export const teamModel =
  mongoose.models.teams || mongoose.model("teams", teamSchema);
