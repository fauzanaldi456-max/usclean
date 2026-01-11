import fs from "fs/promises"
import path from "path"
import React from "react"

const extractMain = (source: string) => {
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  let content = bodyMatch ? bodyMatch[1] : source
  content = content.replace(/<header[\s\S]*?<\/header>/i, "")
  return content
}

type Props = {
  removeTexts?: string[]
  stripTopBar?: boolean
}

export default async function OkegasContent({ removeTexts = [], stripTopBar = false }: Props) {
  const filePath = path.join(process.cwd(), "okegas.html")
  let html = ""
  try {
    html = await fs.readFile(filePath, "utf-8")
  } catch {
    html = "<div>Konten belum tersedia</div>"
  }
  let cleaned = extractMain(html)
  if (removeTexts.length > 0) {
    for (const t of removeTexts) {
      const esc = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const anchorRegex = new RegExp(`<a[^>]*>[^<]*${esc}[^<]*<\\/a>`, "gi")
      cleaned = cleaned.replace(anchorRegex, "")
      const liRegex = new RegExp(`<li[^>]*>[^<]*${esc}[^<]*<\\/li>`, "gi")
      cleaned = cleaned.replace(liRegex, "")
      const textRegex = new RegExp(esc, "gi")
      cleaned = cleaned.replace(textRegex, "")
    }
  }
  const imgRegex = new RegExp("<img[^>]*(Us Clean Services|wp-content\\/uploads|cropped-Us Clean Services)[^>]*>", "gi")
  cleaned = cleaned.replace(imgRegex, "")
  const giftRegex = new RegExp("<i[^>]*fa-?gift[^>]*>\\s*<\\/i>", "gi")
  cleaned = cleaned.replace(giftRegex, "")
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
  cleaned = cleaned.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "")
  cleaned = cleaned.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
  cleaned = cleaned.replace(/<video[^>]*>[\s\S]*?<\/video>/gi, "")
  cleaned = cleaned.replace(/<picture[^>]*>[\s\S]*?<\/picture>/gi, "")
  cleaned = cleaned.replace(/<img[^>]*>/gi, "")
  cleaned = cleaned.replace(/<[^>]*(src|href)\s*=\s*["']\s*data:[^"']*["'][^>]*>[\s\S]*?(<\/\w+>)?/gi, "")
  cleaned = cleaned.replace(/\s{2,}/g, " ")
  if (stripTopBar) {
    cleaned = cleaned.replace(/<hr[^>]*>/gi, "")
    cleaned = cleaned.replace(/<div[^>]*class=["'][^"']*(topbar|header-line|jeg_top_bar|vc_separator|jeg_separator)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
    cleaned = cleaned.replace(/<div[^>]*style=["'][^"']*(border-top|border[^"']*top)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
    cleaned = cleaned.replace(/<div[^>]*style=["'][^"']*height\s*:\s*(1|2|3|4|5|6|7|8|9|10)px[^"']*background[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
    cleaned = cleaned.replace(/<div[^>]*style=["'][^"']*background[^"']*#0[a-f0-9]{5}[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
    cleaned = cleaned.replace(/<div[^>]*style=["'][^"']*border-radius[^"']*(50|100)%[^"']*background[^"']*#0[a-f0-9]{5}[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")
  }
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cleaned }} />
}
