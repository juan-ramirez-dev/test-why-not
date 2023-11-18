import  {connect, connection} from 'mongoose'

const conn = {
  isConnected : false
}

export const dbConnect = async () => {

  //@INFO: if connected is true, then return
  if(conn.isConnected) return 

  const db = await connect(process.env.MONGO_URI!)
  conn.isConnected = db?.connections[0]?.readyState === 1 ? true : false
}

connection.on('connected', () => {
  console.log('MongoDB connected')
})

connection.on('error', (err : any) => {
  console.log(err)
})
