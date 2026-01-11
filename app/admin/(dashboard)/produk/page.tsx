"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

type ProductItem = {
  id: number
  title: string
  excerpt: string
  image: string
}

type ProductData = {
  header: {
    title: string
    highlight: string
    description: string
  }
  items: ProductItem[]
}

const emptyItem = (nextId: number): ProductItem => ({
  id: nextId,
  title: "",
  excerpt: "",
  image: "",
})

export default function AdminProdukPage() {
  const [data, setData] = useState<ProductData>({
    header: { title: "", highlight: "", description: "" },
    items: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/produk-content")
        const json = await res.json()
        setData({
          header: json.header || { title: "Produk", highlight: "Kami", description: "" },
          items: Array.isArray(json.items) ? json.items : [],
        })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const nextId = useMemo(() => {
    const ids = data.items.map(i => i.id).filter(n => Number.isFinite(n))
    return (ids.length ? Math.max(...ids) : 0) + 1
  }, [data.items])

  const setHeader = (field: keyof ProductData["header"], value: string) => {
    setData(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value },
    }))
  }

  const setItemField = (id: number, field: keyof ProductItem, value: any) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const addItem = () => {
    setData(prev => ({ ...prev, items: [emptyItem(nextId), ...prev.items] }))
  }

  const removeItem = (id: number) => {
    setData(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }))
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/produk-content", {
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
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Admin Produk</h1>
        <p className="text-sm text-slate-600">Kelola daftar produk dan deskripsi halaman.</p>
      </div>

      {/* Header Section */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Header Halaman</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Judul Utama</Label>
              <Input
                value={data.header.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeader("title", e.target.value)}
                placeholder="Contoh: Produk"
              />
            </div>
            <div className="space-y-2">
              <Label>Highlight (Warna Biru)</Label>
              <Input
                value={data.header.highlight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeader("highlight", e.target.value)}
                placeholder="Contoh: Kami"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              value={data.header.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHeader("description", e.target.value)}
              placeholder="Deskripsi singkat halaman..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Daftar Produk</h2>
          <Button onClick={addItem} variant="outline">
            Tambah Produk
          </Button>
        </div>

        <div className="grid gap-4">
          {data.items.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border">
                  {item.image ? (
                    <Image
                      loader={({ src }) => src}
                      unoptimized
                      src={item.image}
                      alt={item.title || "Produk"}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">No Image</div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <Input
                    value={item.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemField(item.id, "title", e.target.value)}
                    placeholder="Nama Produk"
                    className="font-medium"
                  />
                  <Textarea
                    value={item.excerpt}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setItemField(item.id, "excerpt", e.target.value)}
                    placeholder="Deskripsi singkat..."
                    className="text-sm h-20"
                  />
                  <Input
                    value={item.image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemField(item.id, "image", e.target.value)}
                    placeholder="/images/produk.jpg"
                    className="text-xs font-mono"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="sticky bottom-6 flex justify-end">
        <Button onClick={save} disabled={saving} size="lg" className="shadow-lg">
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        {message && <div className="ml-4 flex items-center text-sm font-medium text-green-600">{message}</div>}
      </div>
    </div>
  )
}
