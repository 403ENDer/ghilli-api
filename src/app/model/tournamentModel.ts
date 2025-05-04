import mongoose, { Schema } from 'mongoose';
//doubts what happens when the location of a tournament changes for each match?
// and shouldn't we add the details of all the matches conducted in the tournament
interface tournament {
  name: string;
  location: string;
  createdBy: mongoose.ObjectId;
  adminIds: mongoose.ObjectId[];
  startDate: Date;
  endDate: Date;
}

const tournamentSchema = new Schema<tournament>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    adminIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }], //added so that user can add admin whenever needed
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const tournamentModel = mongoose.models.tournament || mongoose.model('tournament', tournamentSchema);
