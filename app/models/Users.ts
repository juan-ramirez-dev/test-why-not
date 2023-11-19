import { Schema, model, models } from "mongoose";


const usersSchema = new Schema({
  name: { type: String, required: [true, 'name is required'], trim: true, maxLength : 100 },
  email: { type: String, required: [true, 'email is required'], trim: true ,  maxLength : 100 },
  password: { type: String, required: [true, 'password is required'], trim: true },
  role_id: { type: Schema.Types.ObjectId, ref: 'Roles' },
}, {
  timestamps : true
})


export default models.Users as any || model('Users', usersSchema) as any