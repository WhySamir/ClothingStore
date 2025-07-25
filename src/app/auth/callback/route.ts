import { googleAvatartoCloud } from '@/app/lib/googleAvatar';
import { prisma } from '@/app/lib/prisma';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Missing authentication code`
    );
  }

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    const userId = data.session?.user.id; 

    if (userId) {
      const customer = await prisma.customer.findUnique({ where: { id: userId } });
      if (customer) {
        await googleAvatartoCloud(customer);
      }
    }
    
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    
  } catch (error: unknown) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent((error as Error).message)}`
    );
  }
}