//@INFO Models
import Users from '@/app/models/Users'

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"
import { createToken } from '@/app/utils/tokens';

//@INFO Next and libraries
import { NextResponse } from "next/server"
import Roles from '@/app/models/Roles';
const bcrypt = require('bcrypt');

//@INFO Connect to database
dbConnect()

export interface IPOSTRequest {
  email : string
  password : string
  name : string
  slug_rol ?: string
  is_google ? : boolean
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

  //@INFO: Buscar rol por slug.
  params.slug_rol = params?.slug_rol || 'default-participant'
  const role = await Roles.findOne({slug : params?.slug_rol}).lean()
  const default_role = role?._id ? role : await Roles.findOne({slug : 'default-participant'}).lean()

  //@INFO: Creacion de contraseña encriptada.
  const new_pass = await bcrypt.hash(params?.password, 10);

  //@INFO: Creacion de usuario
  await Users.create({
    email : params?.email,
    name : params?.name,
    password : new_pass,
    role_id : default_role?._id,
    is_google : params?.is_google || false
  })

  const new_user = await Users.findOne({ email : params?.email }).populate("role_id").lean();

  await createToken(user?._id)

  return NextResponse.json(createResponseSuccess({
    message : 'success',
    data : new_user
  }));
}