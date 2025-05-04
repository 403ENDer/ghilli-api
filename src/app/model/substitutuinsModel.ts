import mongoose, { Schema } from 'mongoose';
//doubts playerOut and playerIn needs to be a list right?
interface substitutions {
  mathcId: mongoose.ObjectId;
  teamId: mongoose.ObjectId;
  playerOut: mongoose.ObjectId;
  playerIn: mongoose.ObjectId;
}

const substitutionSchema = new Schema<substitutions>(
  {
    mathcId: { type: Schema.ObjectId, ref: 'matches', required: true },
    teamId: { type: Schema.ObjectId, ref: 'teams', required: true },
    playerIn: { type: Schema.ObjectId, ref: 'user', required: true },
    playerOut: { type: Schema.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

export const substitutionModel = mongoose.models.substitutions || mongoose.model('substitutions', substitutionSchema);
