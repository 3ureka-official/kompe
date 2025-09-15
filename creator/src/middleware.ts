import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const session = await cookieStore.get("__Secure-authjs.session-token");
  if (!session)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
}
export const config = {
  matcher: [
    "/((?!api|competitions|login|_next/static|_next/image|favicon.ico|.*\\.svg|$).*)",
  ],
};
