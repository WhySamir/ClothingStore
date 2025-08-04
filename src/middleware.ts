import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('Middleware triggered :', request.url)

  // Allow auth callback route without checks
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null

  let bearerUser = null

  if (token) {
    console.log('🔑 Bearer token detected, verifying...')

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! 
    )

    const { data, error } = await supabaseAdmin.auth.getUser(token)

    if (error) {
      console.log(' Invalid token:', error.message)
    } else {
      console.log('Token verified, user:', data.user.email)
      bearerUser = data.user
    }
  }


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, ...options }) => {
            response.cookies.set({ name, value, ...options })
          })
        }
      }
    }
  )

  // Get authenticated user from Supabase server

  const { data: { user }, error } = await supabase.auth.getUser()

  // If user is not logged in, redirect to login
  const isLoginRoute = request.nextUrl.pathname === '/' 
  if (error || !user) {
    if (!isLoginRoute) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return response
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith('/api/private')
  const isDashboardAdmin = request.nextUrl.pathname.startsWith('/dashboard/admin')

  // protect private API routes only admin role
  if (isAdminRoute) {
    const role = user.user_metadata?.role
    if (role !== 'admin') {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    return response
  }

  // protect dashboard/admin pages only admin 
  if (isDashboardAdmin) {
    const role = user.user_metadata?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/private/:path*'],
}
