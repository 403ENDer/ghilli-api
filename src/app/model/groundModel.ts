import mongoose, { Schema } from 'mongoose';
//need to add lat and long to filter based on request
interface ground {
  name: string;
  locationUrl: string;
  adminId: mongoose.ObjectId;
}

const groundSchema = new Schema<ground>(
  {
    name: { type: String, required: true },
    locationUrl: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  },
  { timestamps: true }
);

export const GroundModel = mongoose.models.grounds || mongoose.model('grounds', groundSchema);
