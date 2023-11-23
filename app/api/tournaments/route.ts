//@INFO Models
import Tournaments from '@/app/models/Tournaments';

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"

//@INFO Next and libraries
import { NextResponse } from "next/server"

//@INFO Connect to database
dbConnect()

export interface IGETRequest {
}


export const GET = async (request : Request) => {

  try {
    const TournamentList = await Tournaments.find({}).populate('createdBy', '_id name').lean()

    return NextResponse.json(createResponseSuccess({
      message : 'success',
      data : TournamentList
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message : 'Error'
    }))
  }

}


export interface IPOSTRequest {
  name: string;
  description: string;
  participants: string[]; // Array de IDs de usuarios
  createdBy: string; // ID del usuario que crea el torneo
  price: number
}

export const POST = async (request: Request) => {
  try {
    const { name, description, participants, createdBy , price} = await request.json() as IPOSTRequest;

    if (!name || !description || !participants || !createdBy || !price) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    if(!price || !name?.length  || name?.length > 99 || !description?.length || description?.length > 99){
      return NextResponse.json(createResponseFailed({
        message: 'Maximum 100 characters in title and description'
      }));
    }

    const newTournament = new Tournaments({
      name,
      description,
      participants,
      createdBy,
      price : Number(price)
    });

    await newTournament.save();

    return NextResponse.json(createResponseSuccess({
      message: 'Tournament created successfully',
      data: newTournament,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error creating tournament',
    }));
  }
};



export interface IPUTRequest {
  tournamentId: string;
  name?: string;
  description?: string;
  participants?: string[]; // Array de IDs de usuarios
  price ? : string
}

export const PUT = async (request: Request) => {
  try {
    const { tournamentId, name, description, participants, price } = await request.json() as IPUTRequest;

    if (!tournamentId || (!name && !description && !participants && !price)) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    if(!price?.length || !name?.length  || name?.length > 99 || !description?.length || description?.length > 99){
      return NextResponse.json(createResponseFailed({
        message: 'Maximum 100 characters in title and description'
      }));
    }

    const tournament = await Tournaments.findById(tournamentId).lean();

    if (!tournament) {
      return NextResponse.json(createResponseFailed({
        message: 'Tournament not found',
      }));
    }

    if (name) tournament.name = name;
    if (description) tournament.description = description;
    if (participants) tournament.participants = participants;
    if (price) tournament.price = Number(price);

    await Tournaments.findByIdAndUpdate(tournamentId, { $set: tournament });

    return NextResponse.json(createResponseSuccess({
      message: 'Tournament updated successfully',
      data: tournament,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error updating tournament',
    }));
  }
};


export interface IDELETERequest {
  tournamentId: string;
}

export const DELETE = async (request: Request) => {
  try {
    const { tournamentId } = await request.json() as IDELETERequest;

    if (!tournamentId) {
      return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }));
    }

    const deletedTournament = await Tournaments.findByIdAndDelete(tournamentId).lean();

    if (!deletedTournament) {
      return NextResponse.json(createResponseFailed({
        message: 'Tournament not found',
      }));
    }

    return NextResponse.json(createResponseSuccess({
      message: 'Tournament deleted successfully',
      data: deletedTournament,
    }));
  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error deleting tournament',
    }));
  }
};
