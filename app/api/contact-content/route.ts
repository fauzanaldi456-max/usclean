import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { getContent, setContent } from "@/lib/content-store"

const dataPath = path.join(process.cwd(), "app", "hubungi-kami", "content.json")
const contentKey = "contact"

export async function GET() {
  const data = await getContent<Record<string, unknown>>({ key: contentKey, filePath: dataPath, fallback: {} })
  return NextResponse.json(data, { status: 200 })
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    await setContent({ key: contentKey, filePath: dataPath, data: body })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
