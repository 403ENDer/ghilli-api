import mongoose, { Schema } from 'mongoose';

interface matchEvents {
  matchId: mongoose.ObjectId;
  raiderId: mongoose.ObjectId;
  defendersInvolved: mongoose.ObjectId[];
  touchPoints: number;
  bonusPoint: number;
  isSuccessful: boolean;
}

const matchEventSchema = new Schema<matchEvents>({
  matchId: { type: Schema.Types.ObjectId, ref: 'matches', required: true },
  raiderId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  defendersInvolved: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  touchPoints: { type: Number, default: 0 },
  bonusPoint: { type: Number, default: 0 },
  isSuccessful: { type: Boolean, default: false, required: true },
});

export const matchEventModel = mongoose.models.matchEvents || mongoose.model('matchEvents', matchEventSchema);
