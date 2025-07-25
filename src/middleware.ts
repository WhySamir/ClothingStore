import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered for request:', request.url);
  
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession();
  
  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/private');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');

  if (isAdminRoute) {
    if (!session?.user ) {
       return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );}
     const role = session?.user.user_metadata?.role;
    if (role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return response;
  }

  // Redirect unauthenticated users for non-API routes
  if (!session?.user && !isLoginRoute ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Admin role check for non-API routes
  if (session?.user && request.nextUrl.pathname.startsWith('/dashboard/admin')) {
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
  
    '/dashboard/:path*',
    '/api/private/:path*',
   
  ]
};