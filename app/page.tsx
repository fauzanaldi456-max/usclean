import fs from "fs/promises"
import path from "path"
import HomeClient from "./home-client"



export default async function Home() {
  const homePath = path.join(process.cwd(), "app", "home-content.json")
  const servicesPath = path.join(process.cwd(), "app", "layanan-kami", "content.json")

  let homeData = {}
  let serviceData = {}

  try {
    const homeContent = await fs.readFile(homePath, "utf-8")
    homeData = JSON.parse(homeContent)
  } catch (error) {
    console.error("Error reading home-content.json:", error)
  }

  try {
    const servicesContent = await fs.readFile(servicesPath, "utf-8")
    serviceData = JSON.parse(servicesContent)
  } catch (error) {
    console.error("Error reading layanan-kami/content.json:", error)
  }

  return <HomeClient data={homeData} serviceData={serviceData} />
}
