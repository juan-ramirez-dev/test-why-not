import { Schema, model, models } from "mongoose";

const TournamentsSchema = new Schema({
  name: { type: String, required: [true, 'name is required'], trim: true,  maxLength : 100 },
  description: { type: String, required: [true, 'description is required'], trim: true,  maxLength : 100 },
  participants : [
    { type: Schema.Types.ObjectId, ref: 'Users' }
  ],
  createdBy : { type: Schema.Types.ObjectId, ref: 'Users' },
  price : { type: Number, required: [true, 'price is required'], trim: true,  maxLength : 100 }
}, {
  timestamps : true
})


export default models.Tournaments as any || model('Tournaments', TournamentsSchema) as any