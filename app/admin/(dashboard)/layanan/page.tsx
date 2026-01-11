"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type ServiceItem = {
  title: string
  description: string
  image: string
  gallery?: string[]
  sections?: string[]
}

export default function AdminLayananPage() {
  const [data, setData] = useState<Record<string, ServiceItem>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/layanan-content")
        const json = await res.json()
        setData(json || {})
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const setField = (key: string, field: keyof ServiceItem, value: any) => {
    setData(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }))
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/layanan-content", {
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
    return <div className="container mx-auto px-4 py-6">Memuat…</div>
  }

  const keys = Object.keys(data)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Layanan</h1>
      <div className="flex gap-2">
        <Button onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "Simpan"}</Button>
        {message && <span className="text-slate-700">{message}</span>}
      </div>
      {keys.length === 0 && <div>Tidak ada data layanan. Isi content.json.</div>}
      {keys.map(key => {
        const item = data[key]
        return (
          <div key={key} className="rounded-xl border p-4 space-y-3">
            <div className="text-sm font-semibold text-slate-600">Slug: {key}</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm">Judul</span>
                  <Input value={item.title || ""} onChange={e => setField(key, "title", e.target.value)} />
                </label>
                <label className="block">
                  <span className="text-sm">Deskripsi</span>
                  <Textarea rows={5} value={item.description || ""} onChange={e => setField(key, "description", e.target.value)} />
                </label>
                <label className="block">
                  <span className="text-sm">Gambar utama (path)</span>
                  <Input value={item.image || ""} onChange={e => setField(key, "image", e.target.value)} />
                </label>
              </div>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm">Galeri (pisahkan dengan koma)</span>
                  <Textarea rows={4} value={(item.gallery || []).join(", ")} onChange={e => setField(key, "gallery", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
                </label>
                <label className="block">
                  <span className="text-sm">Sections (paragraf, pisahkan dengan baris)</span>
                  <Textarea rows={4} value={(item.sections || []).join("\n")} onChange={e => setField(key, "sections", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))} />
                </label>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
