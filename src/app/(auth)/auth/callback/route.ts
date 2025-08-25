import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { googleAvatartoCloud } from '@/app/lib/googleAvatar'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${url.origin}?error=Missing authentication code`)
  }

  try {
    const response = NextResponse.redirect(`${url.origin}/post-auth-loading`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(c => ({
              name: c.name,
              value: c.value,
            }))
          },
          setAll(cookies) {
            cookies.forEach(({ name, value, ...options }) => {
              response.cookies.set({ name, value, ...options })
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) throw new Error(`Supabase error: ${error.message}`)


      //upload to cloudinary avatar

     const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No user returned from Supabase')

    const existing = await prisma.customer.findUnique({
      where: { id: user.id }
    })

    if (!existing) {
      const avatarUrl = user.user_metadata?.avatar_url
      const customer = {
        id:user.id,
        userAvatarUrl: user.user_metadata?.avatar_url
      }

      if (avatarUrl) {
         await googleAvatartoCloud(customer) 
      }
} 
    return response
    
  } catch (err) {
    console.error('Callback error:', err)
    return NextResponse.redirect(`${url.origin}?error=${encodeURIComponent((err as Error).message)}`)
  }
}
