"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Lock, User } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError("Username atau password salah")
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0f4c81]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0f4c81]/10 rounded-full blur-3xl pointer-events-none" />
      
      <Card className="w-full max-w-[400px] -mt-14 shadow-2xl border-white/50 backdrop-blur-sm bg-white/90 relative z-10">
        <CardHeader className="text-center pb-2 pt-0">
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-56 h-56 mb-0">
              <Image 
                src="/images/image.png" 
                alt="Logo UMKM" 
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            <div className="-mt-6 space-y-0.5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
              <p className="text-sm text-slate-500">Silakan login untuk mengelola website</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="pl-9 h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#0f4c81] hover:bg-[#0f4c81]/90 h-11 text-base font-medium transition-all active:scale-[0.98]" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Masuk...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </CardContent>
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100 rounded-b-xl">
          <p className="text-xs text-slate-400">
            &copy; 2026 UMKM Kota Piring. All rights reserved.
          </p>
        </div>
      </Card>
    </div>
  )
}
