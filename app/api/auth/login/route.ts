//@INFO Models
import Users from '@/app/models/Users'

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createToken } from '@/app/utils/tokens';
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"

//@INFO Next and libraries
import { NextResponse } from "next/server"
const bcrypt = require('bcrypt');

//@INFO Connect to database
dbConnect()

export interface IPOSTRequest {
  email : string
  password : string
}



export const POST = async (request : Request, res : Response) => {

  const params = await request.json() as IPOSTRequest

  if(!params?.email || !params?.password) return NextResponse.json(createResponseFailed({
    message : 'Invalid data.'
  }));

  //@INFO: Buscar usuario por email
  const user = await Users.findOne({ email : params?.email }).populate("role_id").lean();
  if(!user) return NextResponse.json(createResponseFailed({
    message : 'User not found.'
  }));

  //@INFO: Validacion de contraseñas encriptadas
  const is_same_password = await bcrypt.compare(params?.password, user?.password);
  if(!is_same_password) return NextResponse.json(createResponseFailed({
    message : 'User not found.'
  }));

  await createToken(user?._id)

  return NextResponse.json(createResponseSuccess({
    message : 'success',
    data : user
  }));
}