import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token to check authentication status
  const token = await getToken({ req: request })
  const isAuthenticated = !!token

  // Auth routes that should redirect to dashboard if already authenticated
  const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"]

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/verify-email", "/products", "/api/auth"]

  const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.startsWith("/api/auth/"),
  )

  // If authenticated and trying to access auth routes, redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If it's a public route or auth route, allow access
  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next()
  }

  // If not authenticated and trying to access protected routes, redirect to login
  if (!isAuthenticated) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Admin routes protection
  // if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
}



// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getToken } from "next-auth/jwt"

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // Public routes that don't require authentication
//   const publicRoutes = [
//     "/",
//     "/login",
//     "/register",
//     "/verify-email",
//     "/forgot-password",
//     "/reset-password",
//     "/products",
//     "/api/auth",
//   ]

//   const isPublicRoute = publicRoutes.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.startsWith("/api/auth/"),
//   )

//   // If it's a public route, allow access
//   if (isPublicRoute) {
//     return NextResponse.next()
//   }

//   // Check if the user is authenticated
//   const token = await getToken({ req: request })

//   // If not authenticated, redirect to login
//   if (!token) {
//     const url = new URL("/login", request.url)
//     url.searchParams.set("callbackUrl", encodeURI(request.url))
//     return NextResponse.redirect(url)
//   }

//   // Admin routes protection
//   if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
// }

