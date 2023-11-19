import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  const jwt = request.cookies.get("token")?.value || ''
  if (!!!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("SECRET_KEY_TO_GENERATE_TOKEN")
    );

    if(payload && (request.nextUrl.pathname.includes("/login") || request.nextUrl.pathname.includes("/register"))){
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
  ],
};