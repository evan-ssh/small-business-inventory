
import { cookies } from 'next/headers'
import { jwtVerify } from "jose";

// Helper for verifying the user's login session


export async function getSessionUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return null
  }

  try{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(token, secret);

    return{
  
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      }
    }catch(err){
    console.log("Session check failed: ", err);
    return null 
  }
}
