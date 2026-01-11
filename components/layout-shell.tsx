"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import ScrollToTop from "@/components/scroll-to-top"

interface LayoutShellProps {
  children: React.ReactNode
  navbar: React.ReactNode
  footer: React.ReactNode
}

export default function LayoutShell({ children, navbar, footer }: LayoutShellProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Komponen untuk scroll ke atas saat navigasi */}
      <ScrollToTop />
      {/* Navbar komponen untuk navigasi utama - disembunyikan di admin */}
      {!isAdmin && navbar}
      {/* Konten utama aplikasi */}
      <main className="flex-1">{children}</main>
      {/* Footer komponen untuk bagian bawah halaman - disembunyikan di admin */}
      {!isAdmin && footer}
    </div>
  )
}
