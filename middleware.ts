import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/database.types' // adapte le chemin si besoin

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // createMiddlewareClient gère correctement cookies / session dans le middleware
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.warn('Supabase getSession error in middleware:', error.message)
  }

  const pathname = req.nextUrl.pathname

  if (!session && pathname.startsWith('/app')) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/app', req.url))
  }

  return res
}

export const config = {
  matcher: ['/app/:path*', '/login', '/signup'],
}