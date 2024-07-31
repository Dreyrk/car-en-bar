import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function validateToken(token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_PRIVATE_KEY));
  return payload;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    const payload = await validateToken(token);
    if (payload.userId && payload.role) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/authenticate", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/authenticate", request.url));
  }
}

export const config = {
  matcher: "/profile/:path*",
};
