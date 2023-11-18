//@INFO Models
import Users from '@/app/models/Users'

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"
import { createToken } from '@/app/utils/tokens';

//@INFO Next and libraries
import { NextResponse } from "next/server"
const bcrypt = require('bcrypt');

//@INFO Connect to database
dbConnect()

export interface IPOSTRequest {
  email : string
  password : string
  name : string
  slug_rol ?: string
}


export const POST = async (request : Request) => {

  const params = await request.json() as IPOSTRequest

  if(!params?.email || !params?.password || !params?.name) {
    return NextResponse.json(createResponseFailed({
      message : 'Invalid data.'
    }))
  }

  //@INFO: Buscar usuario por email.
  const user = await Users.findOne({ email : params?.email }).lean();
  if(user) return NextResponse.json(createResponseFailed({
    message : 'Current this user exist.'
  }));

  //@INFO: Creacion de contraseña encriptada.
  const new_pass = await bcrypt.hash(params?.password, 10);

  const new_user_params = {
    email : params?.email,
    name : params?.name,
    password : new_pass
  }

  const new_user = await Users.create(new_user_params)

  await createToken(user?._id)

  return NextResponse.json(createResponseSuccess({
    message : 'success',
    data : new_user
  }));
}