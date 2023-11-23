import mercadopago from "mercadopago";
//@INFO Models
import Tournaments from '@/app/models/Tournaments';

//@INFO Utils
import { createResponseFailed , createResponseSuccess} from "@/app/utils/customResponses"

//@INFO Next and libraries
import { NextResponse } from "next/server"
import Users from "@/app/models/Users";

type PaymentNotificationBody = {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: string;
  user_id: string;
};

export async function POST(req: Request) {
  const body: PaymentNotificationBody = await req.json();

  try {
    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN_MERCADOPAGO!,
    });

    const paymentId = body?.data?.id;

    const payment : any = await mercadopago.payment.findById(
      Number(paymentId)
    );

    if (payment?.body?.status === "approved") {

      const email = payment?.response?.metadata?.email;
      const tournament_id = payment?.response?.metadata?.tournament_id;

      if (!email || !tournament_id) return NextResponse.json(createResponseFailed({
        message: 'Missing required parameters',
      }))

      const user = await Users.findOne({email : email}).select('_id').lean()
      if(!user) return NextResponse.json(createResponseFailed({
        message: 'User not found.',
      }))
      const currentTournament = await Tournaments.findOne({_id : tournament_id}).lean();
      if(!currentTournament) return NextResponse.json(createResponseFailed({
        message: 'Tournament not found.',
      }))

      const new_participants = [...currentTournament.participants, user?._id]
      await Tournaments.updateOne({_id : tournament_id}, {participants : new_participants})
  
      return NextResponse.json(createResponseSuccess({
        message: 'Tournament created successfully',
        data: null
      }));
    }

  } catch (error) {
    return NextResponse.json(createResponseFailed({
      message: 'Internal Server error.',
    }))
  }
}
