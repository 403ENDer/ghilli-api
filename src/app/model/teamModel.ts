import mongoose, { Schema } from 'mongoose';
//doubts why should we have location for a team
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
      ref: 'user',
      required: true,
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

export const teamModel = mongoose.models.teams || mongoose.model('teams', teamSchema);
