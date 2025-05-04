import mongoose, { Schema } from 'mongoose';
//doubts wins, losses and drawn are the raid wins, raid lost and raid drawns for the particular team right?
interface pointsTable {
  tournamentId: mongoose.ObjectId;
  teamId: mongoose.ObjectId;
  matchesPlayed: Number;
  points: Number;
  wins: Number;
  losses: Number;
  drawn: Number;
  totalPoints: Number;
}

const pointsTableSchema = new Schema<pointsTable>({
  tournamentId: { type: Schema.Types.ObjectId, ref: 'tournaments' },
  teamId: { type: Schema.Types.ObjectId, ref: 'teams' },
  matchesPlayed: { type: Number },
  points: { type: Number },
  wins: { type: Number },
  losses: { type: Number },
  drawn: { type: Number },
  totalPoints: { type: Number },
});

export const pointsTableModel =
  mongoose.models.pointsTable || mongoose.model<pointsTable>('pointsTable', pointsTableSchema);
