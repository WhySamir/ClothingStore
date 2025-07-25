import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for request:', request.url);
  
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');

  // Handle API routes differently
  if (isApiRoute) {
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return response;
  }

  // Redirect unauthenticated users for non-API routes
  if (!session?.user && !isLoginRoute && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Admin role check for non-API routes
  if (session?.user && request.nextUrl.pathname.startsWith('/admin')) {
    const role = session.user.user_metadata?.role;
    if (role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/api/:path*',
    '/login'
  ]
};