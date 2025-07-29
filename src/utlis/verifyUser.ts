// utils/verifyUser.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { NextRequest } from 'next/server'

export async function verifyUser(request: NextRequest) {
  //only for postman 
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (token) {
    // use service role to verify user from Bearer token
    const supabaseAdmin = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabaseAdmin.auth.getUser(token)

    if (error || !data.user) {
      throw new Error('Unauthorized')
    }

    return data.user
  }

  // mainpart
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
        }
      }
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Unauthorized')
  }

  return user 
}
