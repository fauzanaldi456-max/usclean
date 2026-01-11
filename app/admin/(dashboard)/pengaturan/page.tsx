"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

type ContactData = {
  companyName?: string
  subtitle?: string
  addressLines?: string[]
  phone?: string
  email?: string
  website?: string
  mapEmbedUrl?: string
  social?: {
    facebook?: string
    instagram?: string
    youtube?: string
    twitter?: string
    whatsapp?: string
  }
}

const empty: ContactData = {
  companyName: "",
  subtitle: "",
  addressLines: [],
  phone: "",
  email: "",
  website: "",
  mapEmbedUrl: "",
  social: { facebook: "", instagram: "", youtube: "", twitter: "", whatsapp: "" },
}

export default function AdminPengaturanPage() {
  const [data, setData] = useState<ContactData>(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Credentials update state
  const [currentUsername, setCurrentUsername] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [passMsg, setPassMsg] = useState("")
  const [passLoading, setPassLoading] = useState(false)

  const handleUpdateCredentials = async () => {
    if (newPass && newPass !== confirmPass) {
      setPassMsg("Password baru tidak cocok")
      return
    }
    
    if (!oldPass) {
      setPassMsg("Masukkan password lama untuk verifikasi")
      return
    }

    setPassLoading(true)
    setPassMsg("")
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          oldPassword: oldPass, 
          newPassword: newPass,
          newUsername: newUsername
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setPassMsg(data.message || "Data berhasil diperbarui")
        setOldPass("")
        setNewPass("")
        setConfirmPass("")
        if (newUsername) {
          setCurrentUsername(newUsername)
          setNewUsername("")
        }
      } else {
        setPassMsg(data.message || "Gagal memperbarui data")
      }
    } catch {
      setPassMsg("Terjadi kesalahan")
    } finally {
      setPassLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/contact-content")
        const json = await res.json()
        setData({ ...empty, ...(json || {}), social: { ...empty.social, ...(json?.social || {}) } })
        
        // Fetch current username
        const userRes = await fetch("/api/auth/update-password")
        if (userRes.ok) {
          const userData = await userRes.json()
          setCurrentUsername(userData.username || "admin")
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const setField = (field: keyof ContactData, value: any) => setData(prev => ({ ...prev, [field]: value }))
  const setSocial = (field: keyof NonNullable<ContactData["social"]>, value: string) =>
    setData(prev => ({ ...prev, social: { ...(prev.social || {}), [field]: value } }))

  const save = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/contact-content", {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Kontak</h1>
        <p className="text-sm text-slate-600">Data ini dipakai di halaman Hubungi Kami.</p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={save} disabled={saving} className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
          {saving ? "Menyimpan…" : "Simpan"}
        </Button>
        {message && <span className="text-sm text-slate-700">{message}</span>}
      </div>

      <Card className="rounded-xl">
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Nama Perusahaan</span>
              <Input value={data.companyName || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("companyName", e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Subjudul</span>
              <Input value={data.subtitle || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("subtitle", e.target.value)} />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-sm text-slate-700">Alamat (pisahkan per baris)</span>
            <Textarea
              rows={4}
              value={(data.addressLines || []).join("\n")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setField("addressLines", e.target.value.split("\n").map(s => s.trim()).filter(Boolean))}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Telepon/WhatsApp</span>
              <Input value={data.phone || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("phone", e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Email</span>
              <Input value={data.email || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("email", e.target.value)} />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-slate-700">Website</span>
              <Input value={data.website || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("website", e.target.value)} />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-slate-700">Map Embed URL</span>
              <Input value={data.mapEmbedUrl || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("mapEmbedUrl", e.target.value)} />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Facebook URL</span>
              <Input value={data.social?.facebook || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocial("facebook", e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Instagram URL</span>
              <Input value={data.social?.instagram || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocial("instagram", e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">YouTube URL</span>
              <Input value={data.social?.youtube || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocial("youtube", e.target.value)} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Twitter URL</span>
              <Input value={data.social?.twitter || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocial("twitter", e.target.value)} />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-slate-700">WhatsApp URL (wa.me)</span>
              <Input value={data.social?.whatsapp || ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocial("whatsapp", e.target.value)} />
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-1 pt-4">
        <h2 className="text-xl font-bold text-slate-900">Keamanan Akun</h2>
        <p className="text-sm text-slate-600">Ganti username atau password akun admin.</p>
      </div>

      <Card className="rounded-xl">
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-4 max-w-md">
            <div className="p-3 bg-slate-50 border rounded-lg text-sm text-slate-700">
              Username saat ini: <strong>{currentUsername}</strong>
            </div>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Username Baru (Opsional)</span>
              <Input 
                type="text" 
                value={newUsername} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUsername(e.target.value)} 
                placeholder="Biarkan kosong jika tidak ingin mengubah"
              />
            </label>

            <div className="border-t border-slate-100 my-2"></div>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Password Baru (Opsional)</span>
              <Input 
                type="password" 
                value={newPass} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value)} 
                placeholder="Biarkan kosong jika tidak ingin mengubah"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Konfirmasi Password Baru</span>
              <Input 
                type="password" 
                value={confirmPass} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)} 
                placeholder="Ulangi password baru"
              />
            </label>

            <div className="border-t border-slate-100 my-2"></div>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700 font-medium">Password Saat Ini (Wajib)</span>
              <Input 
                type="password" 
                value={oldPass} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPass(e.target.value)} 
                placeholder="Masukkan password saat ini untuk verifikasi"
                required
              />
            </label>
            
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                onClick={handleUpdateCredentials} 
                disabled={passLoading || !oldPass || (!newPass && !newUsername)} 
                className="bg-[#0f4c81] hover:bg-[#0f4c81]/90 w-full md:w-auto"
              >
                {passLoading ? "Memproses..." : "Simpan Perubahan"}
              </Button>
              {passMsg && (
                <p className={`text-sm ${passMsg.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                  {passMsg}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

