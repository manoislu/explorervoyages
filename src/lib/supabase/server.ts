import { createServerClient, type SupabaseClient } from '@supabase/ssr'
import { cookies as nextCookies, type RequestCookies } from 'next/headers'
import type { Database } from '@/lib/supabase/database.types' // adapte le chemin si besoin

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing SUPABASE env vars')
}

/**
 * Crée un client Supabase côté serveur/SSR, typé, adapté à Next.js app router.
 * Si tu veux passer explicitement un store de cookies (par exemple pour tests/edge), tu peux.
 * Sinon il se base sur le store Next.js courant.
 */
export function createServer(cookieStoreArg?: RequestCookies): SupabaseClient<Database> {
  // Si aucun store n'est passé, on prend celui de Next.js
  const cookieStore = cookieStoreArg ?? (() => {
    try {
      return nextCookies()
    } catch {
      return undefined
    }
  })()

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: cookieStore,
  })
}