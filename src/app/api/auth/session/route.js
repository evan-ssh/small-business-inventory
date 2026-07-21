import { cookies } from 'next/headers'
import { jwtVerify } from "jose";
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false ,user:null })
  }

  try{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(token, secret);

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      }
    })

  }catch(err){
    console.log("Session check failed: ", err);

    return NextResponse.json({authenticated:false,user:null})

  }
}  