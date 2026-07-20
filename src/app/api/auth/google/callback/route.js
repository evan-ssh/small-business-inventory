import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT } from "jose";
import {getGoogleUser,updateOrCreateUserInfo,} from "@/lib/googleOauthUtils";

export async function GET(request) {
    const {searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {redirect("/login");}

    try{
        const oauthUserInfo = await getGoogleUser(code);
        const createdUser = await updateOrCreateUserInfo(oauthUserInfo); 

        //create jwt   
        const secret = new TextEncoder().encode(
                process.env.JWT_SECRET,
        )
        const alg = 'HS256'
        
        const jwt = await new SignJWT({ 'userId' : createdUser._id.toString(), 'email' : createdUser.email, name: createdUser.name,
            picture: createdUser.picture})
            .setProtectedHeader({ alg })
            .setExpirationTime('1h')
            .sign(secret)
       //add jwt to cookies
        const cookieStore = await cookies();
        cookieStore.set('session', jwt, {  httpOnly: true })
     
        console.log("Google OAuth login successful:", createdUser.email);
    }catch(err){
        console.log("Google OAuth login unsuccessful:", err);
        redirect('/login');
    }
    redirect('/dashboard');
}