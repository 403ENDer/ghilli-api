import mongoose, { Schema } from 'mongoose';

interface playerStats {
  playerId: mongoose.ObjectId;
  matchesPlayed: number;
  raidCount: number;
  successfulRaids: number;
  points: number;
  bonusPoints: number;
  raidPoints: number;
  tackleCount: number;
  tacklePoints: number;
  superTackle: number;
}

const playerStatsSchema = new Schema<playerStats>(
  {
    playerId: { type: Schema.Types.ObjectId, ref: 'user' },
    raidCount: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },
    successfulRaids: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    bonusPoints: { type: Number, default: 0 },
    raidPoints: { type: Number, default: 0 },
    tackleCount: { type: Number, default: 0 },
    tacklePoints: { type: Number, default: 0 },
    superTackle: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const playerStatsModel =
  mongoose.models.playerStats || mongoose.model<playerStats>('playerStats', playerStatsSchema);
