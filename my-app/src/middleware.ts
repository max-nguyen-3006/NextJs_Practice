import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];
export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("sessionToken")?.value;
  if (privatePaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (authPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/me", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [...privatePaths, ...authPaths],
};
