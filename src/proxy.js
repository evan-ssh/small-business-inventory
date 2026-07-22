import {NextResponse} from "next/server";
import {jwtVerify} from "jose";

export async function proxy(request){
    const session = request.cookies.get("session")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try{
        await jwtVerify(session,secret);
    }catch{
        console.log("issue with jwt proxy, redirecting to login");
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/order/:path*"]
}