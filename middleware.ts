import { NextResponse, type NextRequest } from "next/server"
import { verifyToken, COOKIE_NAME } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page and API auth routes
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/logout")
  ) {
    return NextResponse.next()
  }

  const cookie = req.cookies.get(COOKIE_NAME)
  const token = cookie?.value

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  const payload = await verifyToken(token)
  if (!payload) {
    if (pathname.startsWith("/api")) {
       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/layanan-content/:path*",
    "/api/galeri-content/:path*",
    "/api/contact-content/:path*",
    "/api/home-content/:path*",
    "/api/produk-content/:path*",
    "/api/tentang-kami-content/:path*",
    "/api/auth/update-password",
  ],
}
