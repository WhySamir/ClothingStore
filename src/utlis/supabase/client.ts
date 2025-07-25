// utils/supabase/client.ts
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createPagesBrowserClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  })
}