import {NextResponse} from "next/server";
import {jwtVerify} from "jose";

async function isSessionAuthed(session) {
    if (!session) {
      return false;
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(session, secret);
        return true;
      } catch {
        return false;
      }
 }


export async function proxy(request){
    const session = request.cookies.get("session")?.value;
    const hasValidSession = await isSessionAuthed(session);
    
    if (request.nextUrl.pathname === "/login") {
        if (hasValidSession) {
        return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    }

    if (!hasValidSession) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
    }


export const config = {
    matcher: ["/dashboard/:path*", "/order/:path*","/stores/:path*", "/login"],
};
