"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

type GalleryItem = {
  id: number
  title: string
  category: string
  image: string
  description: string
  featured?: boolean
}

type GalleryData = {
  items: GalleryItem[]
}

const emptyItem = (nextId: number): GalleryItem => ({
  id: nextId,
  title: "",
  category: "",
  image: "",
  description: "",
  featured: false,
})

export default function AdminGaleriPage() {
  const [data, setData] = useState<GalleryData>({ items: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/galeri-content")
        const json = await res.json()
        setData({ items: Array.isArray(json?.items) ? json.items : [] })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const nextId = useMemo(() => {
    const ids = data.items.map(i => i.id).filter(n => Number.isFinite(n))
    return (ids.length ? Math.max(...ids) : 0) + 1
  }, [data.items])

  const setField = (id: number, field: keyof GalleryItem, value: any) => {
    setData(prev => ({
      items: prev.items.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const addItem = () => {
    setData(prev => ({ items: [emptyItem(nextId), ...prev.items] }))
  }

  const removeItem = (id: number) => {
    setData(prev => ({ items: prev.items.filter(i => i.id !== id) }))
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/galeri-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to save")
      setMessage("Tersimpan")
    } catch {
      setMessage("Gagal menyimpan")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-sm text-slate-600">Memuat…</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Admin Galeri</h1>
        <p className="text-sm text-slate-600">Kelola item galeri yang tampil di halaman Galeri.</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={addItem} variant="outline">
          Tambah Item
        </Button>
        <Button onClick={save} disabled={saving} className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
          {saving ? "Menyimpan…" : "Simpan"}
        </Button>
        {message && <span className="text-sm text-slate-700">{message}</span>}
      </div>

      {data.items.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-sm text-slate-600">Belum ada item galeri.</div>
      ) : (
        <div className="grid gap-4">
          {data.items.map(item => (
            <Card key={item.id} className="rounded-xl">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">ID: {item.id}</div>
                    <div className="text-xs text-slate-600">Item galeri</div>
                  </div>
                  <Button variant="destructive" onClick={() => removeItem(item.id)}>
                    Hapus
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-sm text-slate-700">Judul</span>
                    <Input value={item.title || ""} onChange={e => setField(item.id, "title", e.target.value)} />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-sm text-slate-700">Kategori</span>
                    <Input value={item.category || ""} onChange={e => setField(item.id, "category", e.target.value)} />
                  </label>

                  <label className="grid gap-1 md:col-span-2">
                    <span className="text-sm text-slate-700">Path Gambar</span>
                    <Input value={item.image || ""} onChange={e => setField(item.id, "image", e.target.value)} />
                  </label>

                  <label className="grid gap-1 md:col-span-2">
                    <span className="text-sm text-slate-700">Deskripsi</span>
                    <Textarea rows={3} value={item.description || ""} onChange={e => setField(item.id, "description", e.target.value)} />
                  </label>

                  <label className="flex items-center gap-2">
                    <Checkbox
                      checked={!!item.featured}
                      onCheckedChange={v => setField(item.id, "featured", v === true)}
                    />
                    <span className="text-sm text-slate-700">Featured</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

