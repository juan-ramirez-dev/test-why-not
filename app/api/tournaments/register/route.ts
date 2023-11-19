//@INFO Models
import Tournaments from '@/app/models/Tournaments';

//@INFO Utils
import {dbConnect} from '@/app/utils/mongoose'
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"

//@INFO Next and libraries
import { NextResponse } from "next/server"

//@INFO Connect to database
dbConnect()

export interface IPOSTRequest {
  tournamentId : string
  userId : string
}

export const POST = async (request: Request) => {
  try {
    const {tournamentId, userId} = await request.json() as IPOSTRequest;

    if (!userId || !tournamentId) return NextResponse.json(createResponseFailed({
      message: 'Missing required parameters',
    }))

    const currentTournament = await Tournaments.findOne({_id : tournamentId}).lean();
    if(!currentTournament) return NextResponse.json(createResponseFailed({
      message: 'Tournament not found.',
    }))
    
    const new_participants = [...currentTournament.participants, userId]
    await Tournaments.updateOne({_id : tournamentId}, {participants : new_participants})

    return NextResponse.json(createResponseSuccess({
      message: 'Tournament created successfully',
      data: null
    }));

  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Error creating tournament',
    }));
  }
};
