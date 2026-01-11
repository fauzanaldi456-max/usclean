import fs from "fs/promises"
import path from "path"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const layananPath = path.join(process.cwd(), "app", "layanan-kami", "content.json")
const galeriPath = path.join(process.cwd(), "app", "galeri", "content.json")
const kontakPath = path.join(process.cwd(), "app", "hubungi-kami", "content.json")

const safeReadJson = async <T,>(p: string, fallback: T): Promise<T> => {
  try {
    const raw = await fs.readFile(p, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export default async function AdminDashboardPage() {
  const layanan = await safeReadJson<Record<string, unknown>>(layananPath, {})
  const galeri = await safeReadJson<{ items?: unknown[] }>(galeriPath, { items: [] })
  const kontak = await safeReadJson<Record<string, unknown>>(kontakPath, {})

  const layananCount = Object.keys(layanan || {}).length
  const galeriCount = Array.isArray(galeri.items) ? galeri.items.length : 0
  const kontakReady = Object.keys(kontak || {}).length > 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Admin</h1>
        <p className="text-sm text-slate-600">Kelola konten website lewat URL admin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-xl">
          <CardHeader className="pb-2 text-sm font-semibold text-slate-700">Layanan</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{layananCount}</div>
            <div className="mt-3">
              <Button asChild className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
                <Link href="/admin/layanan">Kelola Layanan</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="pb-2 text-sm font-semibold text-slate-700">Galeri</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{galeriCount}</div>
            <div className="mt-3">
              <Button asChild className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
                <Link href="/admin/galeri">Kelola Galeri</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader className="pb-2 text-sm font-semibold text-slate-700">Kontak</CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{kontakReady ? "OK" : "—"}</div>
            <div className="mt-3">
              <Button asChild className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
                <Link href="/admin/pengaturan">Kelola Kontak</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-700">
        <div className="font-semibold text-slate-900">URL Admin</div>
        <div className="mt-2 grid gap-1">
          <div>
            <span className="font-semibold">Dashboard:</span> <span className="font-mono">/admin</span>
          </div>
          <div>
            <span className="font-semibold">Layanan:</span> <span className="font-mono">/admin/layanan</span>
          </div>
          <div>
            <span className="font-semibold">Galeri:</span> <span className="font-mono">/admin/galeri</span>
          </div>
          <div>
            <span className="font-semibold">Kontak:</span> <span className="font-mono">/admin/pengaturan</span>
          </div>
        </div>
      </div>
    </div>
  )
}

