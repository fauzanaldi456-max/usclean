import fs from "fs/promises"
import path from "path"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"



export default async function EducationPage() {
  const dataPath = path.join(process.cwd(), "app", "produk", "content.json")
  let data = {
    header: {
      title: "Produk",
      highlight: "Kami",
      description: "Kami menyediakan Kue Cakar Ayam yang lezat dan bergizi, cocok untuk camilan keluarga, oleh-oleh, maupun acara khusus."
    },
    items: [] as any[]
  }

  try {
    const raw = await fs.readFile(dataPath, "utf-8")
    const json = JSON.parse(raw)
    data = { ...data, ...json }
  } catch (error) {
    // Fallback to default if file missing
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {data.header.title} <span className="text-[#0f4c81]">{data.header.highlight}</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {data.header.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.items.map((article: any) => (
          <Card key={article.id} className="card-hover-effect overflow-hidden">
            <div className="relative h-72 w-full">
              <Image 
                src={article.image || "/placeholder.svg"} 
                alt={article.title} 
                fill 
                className="object-cover" 
              />
            </div>
            <CardHeader>
              <h3 className="text-xl font-bold">{article.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{article.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
