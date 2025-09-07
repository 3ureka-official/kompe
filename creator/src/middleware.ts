export { auth as middleware } from "@/auth";
export const config = {
  matcher: [
    "/((?!api|competitions|login|_next/static|_next/image|favicon.ico|.*\\.svg|$).*)",
  ],
};
