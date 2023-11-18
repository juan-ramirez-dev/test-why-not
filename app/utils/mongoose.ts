import  {connect, connection} from 'mongoose'
import { runSeeds } from '../seeds'

const conn = {
  isConnected : false
}

export const dbConnect = async () => {

  //@INFO: if connected is true, then return
  if(conn.isConnected) return

  const db = await connect(process.env.MONGODB_URI!)
  conn.isConnected = db?.connections[0]?.readyState === 1 ? true : false
}

connection.on('connected', () => {
  //@INFO: Fix this function to run seeds after connection is established.
  runSeeds()
})

connection.on('error', (err : any) => {
  console.log(err)
})
