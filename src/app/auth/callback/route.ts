// app/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Missing authentication code`
    )
  }

  try {
    const response = NextResponse.redirect(`${requestUrl.origin}/dashboard`)
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Use the new getAll method
          getAll() {
            return request.cookies.getAll().map(cookie => ({
              name: cookie.name,
              value: cookie.value
            }))
          },
          // Use the new setAll method
          setAll(cookies) {
            cookies.forEach(({ name, value, ...options }) => {
              // Set cookie on both request and response
              request.cookies.set({ name, value, ...options })
              response.cookies.set({ name, value, ...options })
            })
          }
        }
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }
    
    return response
    
  } catch (error:unknown) {
    console.error('Authentication error:', error)
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent((error as Error).message)}`
    )
  }
}