import fs from "fs/promises"
import path from "path"
import GalleryClient, { type GalleryItem } from "./client"



export default async function GalleryPage() {
  const dataPath = path.join(process.cwd(), "app", "galeri", "content.json")
  let items: GalleryItem[] = []
  
  try {
    const raw = await fs.readFile(dataPath, "utf-8")
    const json = JSON.parse(raw)
    items = Array.isArray(json.items) ? json.items : []
  } catch (error) {
    // If file doesn't exist or is invalid, use empty array
    items = []
  }

  return <GalleryClient initialItems={items} />
}
