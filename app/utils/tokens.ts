import * as jose from 'jose'
import { cookies } from 'next/headers';
 
const SECRET = new TextEncoder().encode(
  process.env.SECRET_KEY_TO_GENERATE_TOKEN!,
)

const createToken = async(userId : string) => {
  const jwt = await new jose
  .SignJWT({ sub: userId })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('3h')
  .sign(SECRET)
  
  cookies().set('token', jwt)
  return jwt;
}

// Genera una funcion con el nombre de validateToken, que valide si el token del usuario sigue estando activo

const validateToken = async () => {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get('token')?.value || ''
    const { payload } = await jose.jwtVerify(token, SECRET, { algorithms: ['HS256'] })

    return payload
  } catch (error) {
    return false
  }

}


export {
  createToken,
  validateToken
}