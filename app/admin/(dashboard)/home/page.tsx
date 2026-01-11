"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

export default function AdminHomePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/home-content")
        const json = await res.json()
        setData(json)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleChange = (section: string, field: string, value: any, index?: number, subField?: string) => {
    setData((prev: any) => {
      const sectionValue = prev?.[section] ?? {}
      if (index !== undefined && subField) {
        const currentItems = Array.isArray(sectionValue.items) ? sectionValue.items : []
        const newArray = [...currentItems]
        newArray[index] = { ...newArray[index], [subField]: value }
        return { ...prev, [section]: { ...sectionValue, items: newArray } }
      } else if (index !== undefined) {
         // Should not happen with current structure but for safety
         return prev
      } else {
        return { ...prev, [section]: { ...sectionValue, [field]: value } }
      }
    })
  }

  const addItem = (section: string, template: any) => {
    setData((prev: any) => {
      const sectionValue = prev?.[section] ?? {}
      const currentItems = Array.isArray(sectionValue.items) ? sectionValue.items : []
      return {
        ...prev,
        [section]: {
          ...sectionValue,
          items: [...currentItems, template],
        },
      }
    })
  }

  const removeItem = (section: string, index: number) => {
    setData((prev: any) => {
      const sectionValue = prev?.[section] ?? {}
      const currentItems = Array.isArray(sectionValue.items) ? sectionValue.items : []
      return {
        ...prev,
        [section]: {
          ...sectionValue,
          items: currentItems.filter((_: any, i: number) => i !== index),
        },
      }
    })
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/home-content", {
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

  if (loading) return <div className="text-sm text-slate-600">Memuat…</div>
  if (!data) return <div>Error loading data</div>

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Admin Beranda</h1>
        <p className="text-sm text-slate-600">Edit konten halaman depan website.</p>
      </div>

      {/* Intro Section */}
      <Card>
        <CardHeader><CardTitle>Intro / Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Utama</Label>
            <Input value={data.intro?.title} onChange={e => handleChange("intro", "title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi 1</Label>
            <Textarea value={data.intro?.description1} onChange={e => handleChange("intro", "description1", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi 2</Label>
            <Textarea value={data.intro?.description2} onChange={e => handleChange("intro", "description2", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Gambar URL</Label>
            <Input value={data.intro?.image} onChange={e => handleChange("intro", "image", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Teks Tombol</Label>
              <Input value={data.intro?.buttonText} onChange={e => handleChange("intro", "buttonText", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Link Tombol</Label>
              <Input value={data.intro?.buttonLink} onChange={e => handleChange("intro", "buttonLink", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layanan Section Header */}
      <Card>
        <CardHeader><CardTitle>Layanan Section Header</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={data.layananSection?.title} onChange={e => handleChange("layananSection", "title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Sub Judul</Label>
            <Input value={data.layananSection?.subtitle} onChange={e => handleChange("layananSection", "subtitle", e.target.value)} />
          </div>
          <p className="text-xs text-slate-500">Catatan: Konten layanan diambil dari halaman Layanan.</p>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader><CardTitle>CTA Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul</Label>
            <Input value={data.cta?.title} onChange={e => handleChange("cta", "title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea value={data.cta?.description} onChange={e => handleChange("cta", "description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Teks Tombol</Label>
            <Input value={data.cta?.buttonText} onChange={e => handleChange("cta", "buttonText", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Reasons Section */}
      <Card>
        <CardHeader><CardTitle>Alasan Memilih Kami</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul Section</Label>
              <Input value={data.reasons?.title} onChange={e => handleChange("reasons", "title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi Section</Label>
              <Textarea value={data.reasons?.description} onChange={e => handleChange("reasons", "description", e.target.value)} />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label>Daftar Alasan</Label>
            {data.reasons?.items?.map((item: any, i: number) => (
              <div key={i} className="border p-4 rounded-lg space-y-3 relative">
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeItem("reasons", i)}>
                    <Trash2 className="w-4 h-4" />
                 </Button>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon (Lucide Name)</Label>
                      <Input value={item.icon} onChange={e => handleChange("reasons", "items", e.target.value, i, "icon")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Judul Item</Label>
                      <Input value={item.title} onChange={e => handleChange("reasons", "items", e.target.value, i, "title")} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Deskripsi Item</Label>
                    <Textarea value={item.desc} onChange={e => handleChange("reasons", "items", e.target.value, i, "desc")} />
                 </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => addItem("reasons", { icon: "Check", title: "Judul Baru", desc: "Deskripsi baru" })}>
              <Plus className="w-4 h-4 mr-2" /> Tambah Alasan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <Card>
        <CardHeader><CardTitle>Testimonial</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul Section</Label>
              <Input value={data.testimonials?.title} onChange={e => handleChange("testimonials", "title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi Section</Label>
              <Textarea value={data.testimonials?.description} onChange={e => handleChange("testimonials", "description", e.target.value)} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Daftar Testimoni</Label>
             {data.testimonials?.items?.map((item: any, i: number) => (
              <div key={i} className="border p-4 rounded-lg space-y-3 relative">
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeItem("testimonials", i)}>
                    <Trash2 className="w-4 h-4" />
                 </Button>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama</Label>
                      <Input value={item.name} onChange={e => handleChange("testimonials", "items", e.target.value, i, "name")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={item.role} onChange={e => handleChange("testimonials", "items", e.target.value, i, "role")} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input value={item.image} onChange={e => handleChange("testimonials", "items", e.target.value, i, "image")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bintang (1-5)</Label>
                      <Input type="number" min="1" max="5" value={item.stars} onChange={e => handleChange("testimonials", "items", parseInt(e.target.value), i, "stars")} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label>Kutipan</Label>
                    <Textarea value={item.quote} onChange={e => handleChange("testimonials", "items", e.target.value, i, "quote")} />
                 </div>
              </div>
            ))}
             <Button variant="outline" onClick={() => addItem("testimonials", { name: "Nama", role: "Role", image: "/placeholder-user.jpg", quote: "Kutipan...", stars: 5 })}>
              <Plus className="w-4 h-4 mr-2" /> Tambah Testimoni
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Partners Section */}
      <Card>
        <CardHeader><CardTitle>Mitra & Pelanggan</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
              <Label>Judul Section</Label>
              <Input value={data.partners?.title} onChange={e => handleChange("partners", "title", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi Section</Label>
              <Textarea value={data.partners?.description} onChange={e => handleChange("partners", "description", e.target.value)} />
            </div>
          </div>

          <Separator />

           <div className="space-y-4">
            <Label>Daftar Mitra</Label>
             {data.partners?.items?.map((item: any, i: number) => (
              <div key={i} className="border p-4 rounded-lg space-y-3 relative flex items-center gap-4">
                 <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={() => removeItem("partners", i)}>
                    <Trash2 className="w-4 h-4" />
                 </Button>
                 <div className="flex-1 space-y-2">
                    <Label>Nama Mitra</Label>
                    <Input value={item.name} onChange={e => handleChange("partners", "items", e.target.value, i, "name")} />
                 </div>
                 <div className="flex-1 space-y-2">
                    <Label>Icon (Lucide Name)</Label>
                    <Input value={item.icon} onChange={e => handleChange("partners", "items", e.target.value, i, "icon")} />
                 </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => addItem("partners", { name: "Mitra Baru", icon: "Building2" })}>
              <Plus className="w-4 h-4 mr-2" /> Tambah Mitra
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="sticky bottom-6 flex justify-end">
        <Button onClick={save} disabled={saving} size="lg" className="shadow-lg">
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        {message && <div className="ml-4 flex items-center text-sm font-medium text-green-600">{message}</div>}
      </div>
    </div>
  )
}
