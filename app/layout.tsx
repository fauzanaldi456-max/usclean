import type React from "react"
import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import fs from "fs/promises"
import path from "path"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LayoutShell from "@/components/layout-shell"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  let title = "Us Clean Services - Jasa Kebersihan Profesional"
  let description = "Layanan kebersihan rumah dan kantor dengan hasil rapi, higienis, dan terpercaya."

  try {
    const contactPath = path.join(process.cwd(), "app", "hubungi-kami", "content.json")
    const contactContent = await fs.readFile(contactPath, "utf-8")
    const contactData = JSON.parse(contactContent)
    
    if (contactData.companyName) {
      title = `${contactData.companyName} - Jasa Kebersihan Profesional`
    }
    if (contactData.subtitle) {
      description = contactData.subtitle
    }
  } catch (e) {
    console.error("Error reading metadata source", e)
  }

  return {
    title,
    description,
  }
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let contactData = {}
  let serviceData = {}

  try {
    const contactPath = path.join(process.cwd(), "app", "hubungi-kami", "content.json")
    const contactContent = await fs.readFile(contactPath, "utf-8")
    contactData = JSON.parse(contactContent)
  } catch (e) {
    console.error("Error reading contact content", e)
  }

  try {
    const servicePath = path.join(process.cwd(), "app", "layanan-kami", "content.json")
    const serviceContent = await fs.readFile(servicePath, "utf-8")
    serviceData = JSON.parse(serviceContent)
  } catch (e) {
    console.error("Error reading service content", e)
  }

  return (
    <html lang="id" className={`${inter.variable} ${nunito.variable}`}>
      <body className={inter.className}>
        <LayoutShell 
          navbar={<Navbar serviceData={serviceData} />} 
          footer={<Footer contactData={contactData} serviceData={serviceData} />}
        >
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}
