import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { hashPassword } from "@/lib/auth"

const CREDENTIALS_PATH = path.join(process.cwd(), "app", "admin-credentials.json")

// GET current username
export async function GET() {
  try {
    const fileContent = await fs.readFile(CREDENTIALS_PATH, "utf-8")
    const credentials = JSON.parse(fileContent)
    return NextResponse.json({ username: credentials.username })
  } catch (error) {
    return NextResponse.json({ message: "Error reading credentials" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { oldPassword, newPassword, newUsername } = await req.json()
    
    // Read credentials
    const fileContent = await fs.readFile(CREDENTIALS_PATH, "utf-8")
    const credentials = JSON.parse(fileContent)

    // Verify old password
    const oldHash = await hashPassword(oldPassword)
    if (oldHash !== credentials.passwordHash) {
      return NextResponse.json({ message: "Password saat ini salah" }, { status: 400 })
    }

    let message = "Data berhasil diperbarui"

    // Update username if provided
    if (newUsername && newUsername.trim() !== "") {
      credentials.username = newUsername.trim()
      message = "Username berhasil diubah"
    }

    // Update password if provided
    if (newPassword && newPassword.trim() !== "") {
      const newHash = await hashPassword(newPassword)
      credentials.passwordHash = newHash
      message = newUsername ? "Username dan password berhasil diubah" : "Password berhasil diubah"
    }

    // Increment session version to invalidate old sessions
    credentials.sessionVersion = (credentials.sessionVersion || 1) + 1 

    await fs.writeFile(CREDENTIALS_PATH, JSON.stringify(credentials, null, 2))

    return NextResponse.json({ success: true, message })

  } catch (error) {
    console.error("Update credentials error:", error)
    return NextResponse.json({ message: "Gagal memperbarui data" }, { status: 500 })
  }
}
