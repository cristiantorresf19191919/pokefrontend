import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/login'];

// Check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(pathname) || pathname.startsWith('/api/');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Allow public routes and API routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, we let them through but AuthProvider will handle showing the login modal
  // This allows client-side navigation to work smoothly
  // The token is still checked server-side for SSR/API calls
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

