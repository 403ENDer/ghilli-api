import mongoose, { Schema } from "mongoose";

interface substitutions {
  mathcId: mongoose.ObjectId;
  teamId: mongoose.ObjectId;
  playerOut: mongoose.ObjectId;
  playerIn: mongoose.ObjectId;
}

const substitutionSchema = new Schema<substitutions>(
  {
    mathcId: { type: Schema.ObjectId, ref: "matches", required: true },
    teamId: { type: Schema.ObjectId, ref: "teams", required: true },
    playerIn: { type: Schema.ObjectId, ref: "players", required: true },
    playerOut: { type: Schema.ObjectId, ref: "players", required: true },
  },
  { timestamps: true }
);

export const substitutionModel =
  mongoose.models.substitutions ||
  mongoose.model("substitutions", substitutionSchema);
