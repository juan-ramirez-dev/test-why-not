import { Schema, model, models } from "mongoose";

const TournamentsSchema = new Schema({
  name: { type: String, required: [true, 'name is required'], trim: true },
  description: { type: String, required: [true, 'description is required'], trim: true },
  participants : [
    { type: Schema.Types.ObjectId, ref: 'Users' }
  ],
  createdBy : { type: Schema.Types.ObjectId, ref: 'Users' }
}, {
  timestamps : true
})


export default models.Tournaments as any || model('Tournaments', TournamentsSchema) as any