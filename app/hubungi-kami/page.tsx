import fs from "fs/promises"
import path from "path"
import ContactClient from "./client"



export default async function ContactPage() {
  const filePath = path.join(process.cwd(), "app", "hubungi-kami", "content.json")
  let data
  try {
    const fileContent = await fs.readFile(filePath, "utf-8")
    data = JSON.parse(fileContent)
  } catch (error) {
    console.error("Error reading content.json:", error)
    data = {}
  }

  return <ContactClient data={data} />
}
