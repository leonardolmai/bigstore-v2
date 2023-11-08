import { NextRequest, NextResponse } from 'next/server'

const authenticatedRoutes = ['/become-company', '/account', '/company']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const requestedPath = request.nextUrl.pathname

  const requiresAuthentication = authenticatedRoutes.includes(requestedPath)

  if (requiresAuthentication && !token) {
    return NextResponse.redirect('http://localhost:3000/login')
  }

  return NextResponse.next()
}
