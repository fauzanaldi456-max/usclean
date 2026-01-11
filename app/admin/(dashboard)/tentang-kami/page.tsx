"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function AdminTentangKamiPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/tentang-kami-content")
        const json = await res.json()
        setData(json)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleChange = (section: string, field: string, value: any, index?: number) => {
    setData((prev: any) => {
      if (index !== undefined && Array.isArray(prev[section])) {
        const newArray = [...prev[section]]
        newArray[index] = { ...newArray[index], [field]: value }
        return { ...prev, [section]: newArray }
      } else if (index !== undefined && field === "paragraphs") {
        // Special case for paragraphs array inside an object
        const newSection = { ...prev[section] }
        const newParagraphs = [...newSection.paragraphs]
        newParagraphs[index] = value
        newSection.paragraphs = newParagraphs
        return { ...prev, [section]: newSection }
      } else {
        return { ...prev, [section]: { ...prev[section], [field]: value } }
      }
    })
  }

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/tentang-kami-content", {
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
        <h1 className="text-2xl font-bold text-slate-900">Admin Tentang Kami</h1>
        <p className="text-sm text-slate-600">Edit konten halaman Tentang Kami.</p>
      </div>

      {/* Header Section */}
      <Card>
        <CardHeader><CardTitle>Header Banner</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Utama</Label>
            <Input value={data.header?.title} onChange={e => handleChange("header", "title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Sub Judul</Label>
            <Input value={data.header?.subtitle} onChange={e => handleChange("header", "subtitle", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea value={data.header?.description} onChange={e => handleChange("header", "description", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Story Section */}
      <Card>
        <CardHeader><CardTitle>Our Story</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={data.story?.heading} onChange={e => handleChange("story", "heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Gambar URL</Label>
            <Input value={data.story?.image} onChange={e => handleChange("story", "image", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Paragraf 1</Label>
            <Textarea value={data.story?.paragraphs?.[0]} onChange={e => handleChange("story", "paragraphs", e.target.value, 0)} />
          </div>
          <div className="space-y-2">
            <Label>Paragraf 2</Label>
            <Textarea value={data.story?.paragraphs?.[1]} onChange={e => handleChange("story", "paragraphs", e.target.value, 1)} />
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card>
        <CardHeader><CardTitle>Statistik & Info</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {data.stats?.map((stat: any, i: number) => (
            <div key={i} className="space-y-3 border-b pb-4 last:border-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon (Lucide Name)</Label>
                  <Input value={stat.icon} onChange={e => handleChange("stats", "icon", e.target.value, i)} />
                </div>
                <div className="space-y-2">
                  <Label>Count / Judul</Label>
                  <Input value={stat.count} onChange={e => handleChange("stats", "count", e.target.value, i)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea value={stat.description} onChange={e => handleChange("stats", "description", e.target.value, i)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Commitment Section */}
      <Card>
        <CardHeader><CardTitle>Komitmen</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={data.commitment?.heading} onChange={e => handleChange("commitment", "heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Gambar URL</Label>
            <Input value={data.commitment?.image} onChange={e => handleChange("commitment", "image", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Paragraf 1</Label>
            <Textarea value={data.commitment?.paragraphs?.[0]} onChange={e => handleChange("commitment", "paragraphs", e.target.value, 0)} />
          </div>
          <div className="space-y-2">
            <Label>Paragraf 2</Label>
            <Textarea value={data.commitment?.paragraphs?.[1]} onChange={e => handleChange("commitment", "paragraphs", e.target.value, 1)} />
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader><CardTitle>CTA (Call to Action)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={data.cta?.heading} onChange={e => handleChange("cta", "heading", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea value={data.cta?.description} onChange={e => handleChange("cta", "description", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tombol Partner</Label>
              <Input value={data.cta?.partnerButton} onChange={e => handleChange("cta", "partnerButton", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tombol Helper</Label>
              <Input value={data.cta?.helperButton} onChange={e => handleChange("cta", "helperButton", e.target.value)} />
            </div>
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
