import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/database.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create Supabase client for middleware (handles cookies correctly)
  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.warn('Supabase getSession error in middleware:', error.message)
  }

  const pathname = req.nextUrl.pathname

  // If not authenticated and trying to access /app => redirect to /login
  if (!session && pathname.startsWith('/app')) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If authenticated, prevent access to /login or /signup
  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/app', req.url))
  }

  return res
}

export const config = {
  matcher: ['/app/:path*', '/login', '/signup'],
}