import mongoose, { Schema } from 'mongoose';

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
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

const matchSchema = new Schema<match>({
  name: { type: String, required: true },
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'tournament',
    required: true,
  },
  ground: { type: Schema.Types.ObjectId, ref: 'grounds', required: true },
  teamA: { type: Schema.Types.ObjectId, ref: 'teams', required: true },
  teamB: { type: Schema.Types.ObjectId, ref: 'teams', required: true },
  teamAscore: { type: Number, default: 0 },
  teamBscore: { type: Number, default: 0 },
  wonBy: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
    required: false,
    default: null,
  },
  date: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'live', 'completed', 'cancelled'], required: true },
});

export const matchModel = mongoose.models.matches || mongoose.model('matches', matchSchema);
