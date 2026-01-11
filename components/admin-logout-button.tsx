"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <Button 
      variant="ghost" 
      className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50 w-full mt-4"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Keluar
    </Button>
  )
}
