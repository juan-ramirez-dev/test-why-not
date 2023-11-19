//@INFO Models
import Users from '@/app/models/Users';

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"

//@INFO Next and libraries
import { NextResponse } from "next/server"

//@INFO Connect to database
dbConnect()


export interface IGETRequestUsers {
}

export const GET = async (request: Request) => {
  try {
    const userList = await Users.find({}).lean();

    return NextResponse.json(createResponseSuccess({
      message: 'success',
      data: userList,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error',
    }));
  }
};


export interface IPOSTRequestUsers {
  name: string;
  email: string;
  password: string;
  role_id: string; // ID del rol asociado al usuario
}

export const POST = async (request: Request) => {
  try {
    const { name, email, password, role_id } = await request.json() as IPOSTRequestUsers;

    if (!name || !email || !password || !role_id) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    const newUser = new Users({
      name,
      email,
      password,
      role_id,
    });

    await newUser.save();

    return NextResponse.json(createResponseSuccess({
      message: 'User created successfully',
      data: newUser,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error creating user',
    }));
  }
};


export interface IPUTRequestUsers {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  role_id?: string; // ID del nuevo rol asociado al usuario
}

export const PUT = async (request: Request) => {
  try {
    const { userId, name, email, password, role_id } = await request.json() as IPUTRequestUsers;

    if (!userId || (!name && !email && !password && !role_id)) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    const user = await Users.findById(userId).lean();

    if (!user) {
      return NextResponse.json(createResponseFailed({
        message: 'User not found',
      }));
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role_id) user.role_id = role_id;

    await Users.findByIdAndUpdate(userId, { $set: user });

    return NextResponse.json(createResponseSuccess({
      message: 'User updated successfully',
      data: user,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error updating user',
    }));
  }
};


export interface IDELETERequestUsers {
  userId: string;
}

export const DELETE = async (request: Request) => {
  try {
    const { userId } = await request.json() as IDELETERequestUsers;

    if (!userId) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    const deletedUser = await Users.findByIdAndDelete(userId).lean();

    if (!deletedUser) {
      return NextResponse.json(createResponseFailed({
        message: 'User not found',
      }));
    }

    return NextResponse.json(createResponseSuccess({
      message: 'User deleted successfully',
      data: deletedUser,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error deleting user',
    }));
  }
};
