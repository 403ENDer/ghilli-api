import mongoose, { Schema } from "mongoose";

interface match {
  name: string;
  tournament: mongoose.ObjectId;
  ground: mongoose.ObjectId;
  teamA: mongoose.ObjectId;
  teamB: mongoose.ObjectId;
  teamAscore: number;
  teamBscore: number;
  wonBy: mongoose.ObjectId;
  date: Date;
}

const matchSchema = new Schema<match>({
  name: { type: String, required: true },
  tournament: {
    type: Schema.Types.ObjectId,
    ref: "tournaments",
    required: true,
  },
  ground: { type: Schema.Types.ObjectId, ref: "grounds", required: true },
  teamA: { type: Schema.Types.ObjectId, ref: "teams", required: true },
  teamB: { type: Schema.Types.ObjectId, ref: "teams", required: true },
  teamAscore: { type: Number, required: true },
  teamBscore: { type: Number, required: true },
  wonBy: { type: Schema.Types.ObjectId, ref: "teams", required: true },
  date: { type: Date, required: true },
});

export const matchModel =
  mongoose.models.matches || mongoose.model("matches", matchSchema);
