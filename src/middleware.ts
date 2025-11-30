import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /admin/dashboard)
  const path = request.nextUrl.pathname;

  // Check if the path is an admin route
  if (path.startsWith('/admin')) {
    // For now, we'll handle authentication on the client side
    // In a production app, you might want to verify the token here
    // But Firebase Auth tokens need to be verified server-side carefully

    // Allow access to login page
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // For dashboard, we'll check authentication on the client side
    // You could add server-side token verification here if needed
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
