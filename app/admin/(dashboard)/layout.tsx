import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "@/components/admin-logout-button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <aside className="rounded-xl border bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">Admin</div>
            <div className="mt-3 grid gap-2">
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/home">Beranda</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/layanan">Layanan</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/galeri">Galeri</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/produk">Produk</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/tentang-kami">Tentang Kami</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/pengaturan">Kontak</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/pengaturan">Pengaturan</Link>
              </Button>
              <div className="my-2 border-t border-slate-100" />
              <AdminLogoutButton />
            </div>
          </aside>
          <main className="rounded-xl border bg-white p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

