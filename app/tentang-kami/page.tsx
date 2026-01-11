import fs from "fs/promises"
import path from "path"
import AboutClient from "./client"



export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "app", "tentang-kami", "content.json")
  let data
  try {
    const fileContent = await fs.readFile(filePath, "utf-8")
    data = JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading content.json:", error)
    // Fallback data or handle error appropriately
    data = {}
  }

  return <AboutClient data={data} />
}
