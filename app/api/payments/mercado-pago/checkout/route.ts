import Tournaments from "@/app/models/Tournaments";
import Users from "@/app/models/Users";
import { PUBLIC_URL } from "@/app/utils/constants";
import mercadopago from "mercadopago";

export interface IPOST {
  tournament_id : string
  user_id : string
}

export async function POST(req: Request) {
  const params: IPOST = await req.json();

  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MERCADOPAGO!,
  });

  const tournament = await Tournaments.findOne({_id : params?.tournament_id}).lean()
  const user = await Users.findOne({_id : params?.user_id}).lean()

  const preference: any = {
    items: [
      {
        id: tournament?._id || '',
        title: tournament?.name || '',
        quantity: 1,
        unit_price: Number(tournament?.price) || 0,
      },
    ],
    auto_return: "approved",
    back_urls: {
      success: `${PUBLIC_URL}/dashboard`,
      failure: `${PUBLIC_URL}/dashboard`,
    },
    notification_url: `${PUBLIC_URL}/api/payments/mercado-pago/notify`,
    shipments: {
      cost: 0,
      mode: "not_specified",
      receiver_address: {
        zip_code: "1234",
        street_name: "",
        city_name: "",
        state_name: "",
      },
    },
    payer: {
      name: user?.name,
      surname: "",
      address: {
        zip_code: "1234",
        street_name: "",
      },
    },
    metadata: {
      email: user?.email,
      name: user?.name,
      cell_phone: user?.email, //@INFO Actualmente no se guarda el numero del usuario.
      slug: user?.email,
      tournament_id : tournament?._id
    },
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
        {
          id: "atm",
        },
        // {
        //   id: "prepaid_card",
        // },
        // {
        //   id: "debit_card",
        // },
      ],
      excluded_payment_methods: [
        {
          id: "pse",
        }
      ],
    },
  };

  const response = await mercadopago.preferences.create(preference);
  
  return new Response(JSON.stringify({ url: response.body.init_point }), {
    status: 201,
  });
}
