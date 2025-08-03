import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";

// Define which routes to protect
const protectedRoutes = ["/chat-with-bot", "/dashboard", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run for protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Check for a session token (e.g., JWT in cookies)
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Redirect to home page if not authenticated
      const homeURL = new URL("/", request.url);
      return NextResponse.redirect(homeURL);
    }

    // Verify the token
    try {
      await verifyToken(token);
    } catch (err) {
      // If verification fails, redirect to home
      const homeURL = new URL("/", request.url);
      return NextResponse.redirect(homeURL);
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

// Specify which paths to run middleware on (for performance)
export const config = {
  matcher: ["/chat-with-bot", "/dashboard", "/profile"],
};

