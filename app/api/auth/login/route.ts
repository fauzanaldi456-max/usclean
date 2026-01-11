import { NextResponse } from "next/server"
import { hashPassword, signToken, COOKIE_NAME } from "@/lib/auth"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    
    // Read credentials
    const credentialsPath = path.join(process.cwd(), "app/admin-credentials.json")
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"))

    const inputHash = await hashPassword(password)
    
    if (username === credentials.username && inputHash === credentials.passwordHash) {
      const token = await signToken({ 
        username,
        version: credentials.sessionVersion 
      })

      const response = NextResponse.json({ success: true })
      
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 hours
      })

      return response
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
