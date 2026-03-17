import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ca', 'es']
const defaultLocale = 'ca'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip public files, api routes, and Next.js internals
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
