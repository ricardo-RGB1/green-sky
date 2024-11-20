import { NextResponse } from "next/server";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


// Create a route matcher for protected routes
const isProtectedRoute = createRouteMatcher(["/"]) 

// Clerk middleware to protect the route
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) { // If the route is protected
    await auth.protect() // Protects the route
  }
  return NextResponse.next() // If the route is not protected, return the next response
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};