import mongoose, { Schema } from "mongoose";

interface tournamentTeams {
  tournamentId: mongoose.ObjectId;
  teamId: [mongoose.ObjectId];
}

const tournamentTeamsSchema = new Schema<tournamentTeams>({
  tournamentId: { type: Schema.Types.ObjectId, ref: "tournaments" },
  teamId: [{ type: Schema.Types.ObjectId, ref: "teams" }],
});

export const tournamentTeamsModel =
  mongoose.models.tournamentTeams ||
  mongoose.model("tournamentTeams", tournamentTeamsSchema);
