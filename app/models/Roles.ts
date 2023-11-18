import { Schema, model, models } from "mongoose";


const rolesSchema = new Schema({
  name: { type: String, required: [true, 'name is required'], trim: true },
  slug: { type: String, required: [true, 'slug is required'], trim: true, unique: true },
  can_create_tournaments : {type : Boolean, default : false}
}, {
  timestamps : true
})


export default models.Roles as any || model('Roles', rolesSchema) as any