import fs from "fs/promises"
import path from "path"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), "app", "layanan-kami", "content.json")
  try {
    const raw = await fs.readFile(dataPath, "utf-8")
    const data = JSON.parse(raw)
    return Object.keys(data).map((slug) => ({
      slug: slug,
    }))
  } catch {
    return []
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dataPath = path.join(process.cwd(), "app", "layanan-kami", "content.json")
  let data: Record<
    string,
    {
      title: string
      description: string
      image: string
      imageFit?: string
      imagePosition?: string
      gallery?: string[]
      sections?: string[]
      hero?: {
        eyebrow?: string
        heading?: string
        paragraphs?: string[]
        image?: string
      }
      programs?: { title: string; desc: string; src: string; imagePosition?: string }[]
      faq?: { q: string; a: string }[]
      faqImage?: string
      cta?: { title?: string; subtitle?: string; buttonText?: string; buttonUrl?: string }
    }
  > | null = null
  try {
    const raw = await fs.readFile(dataPath, "utf-8")
    data = JSON.parse(raw)
  } catch {
    data = null
  }

  const fromJson = data && data[slug]

  return (
    <div className="container mx-auto px-4 py-6">
      {
        <div className={`grid md:grid-cols-2 gap-10 mb-10 items-center px-6 md:px-12 ${slug === "general-cleaning" ? "mt-6 md:mt-8" : "mt-4"}`}>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {fromJson?.hero?.eyebrow ?? "Us Clean Services – Jasa Cuci Sofa Profesional"}
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              {fromJson?.hero?.heading ?? "Ahlinya Cuci Sofa, Kursi, Sofabed"}
            </h1>
            {(fromJson?.hero?.paragraphs ?? [
              "Us Clean Services adalah pilihan utama untuk layanan cuci sofa di Lombok. Keunggulan kami meliputi penggunaan peralatan modern dan teknik cuci yang aman untuk berbagai jenis bahan sofa seperti polyester, katun, linen, oscar, kulit, dan fabric.",
              "Tim profesional kami berpengalaman dalam membersihkan sofa hingga bersih dari noda, bau, bakteri, dan kuman. Kami juga menawarkan layanan fleksibel, baik cuci di tempat maupun antar jemput sofa. Dengan Us Clean Services, sofa Anda akan kembali bersih, segar, dan terawat.",
            ]).map((p, i) => (
              <p key={i} className="mt-3 text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
            <div className="mt-6">
              <Button asChild size="lg" className="bg-[#0f4c81] hover:bg-[#0f4c81]/90">
                <a href="https://wa.me/6281364520919" aria-label="Hubungi Us Clean Services">Hubungi Us Clean Services</a>
              </Button>
            </div>
          </div>
            <div className={`relative w-full ${fromJson?.imageHeight ? fromJson.imageHeight : "h-64 md:h-80"} rounded-xl overflow-hidden`}>
              <Image
                src={fromJson?.hero?.image ?? "/OKE7.jpeg"}
                alt="Sofa setelah dibersihkan"
                fill
                className={`${fromJson?.hero?.imageFit || fromJson?.imageFit || "object-cover"} ${(!fromJson?.hero?.imagePosition?.includes("%") && (fromJson?.hero?.imagePosition || fromJson?.imagePosition)) || "object-center"}`}
                style={fromJson?.hero?.imagePosition?.includes("%") ? { objectPosition: fromJson.hero.imagePosition } : undefined}
              />
            </div>
        </div>
      }
      {
        <div className="px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">
            {fromJson?.title ? `Program ${fromJson.title}` : "Apa Yang Tim Kami Kerjakan?"}
          </h2>
          <p className="text-center text-slate-600 mt-2">
            {fromJson?.description ?? "Program layanan utama kami untuk kebutuhan Anda:"}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(fromJson?.programs ?? []).map((item, i) => (
              <Card key={i} className="h-full border-[#0f4c81]/20 hover:border-[#0f4c81] transition-colors duration-300 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md">
                <CardContent className="flex flex-col items-center p-0 text-center h-full">
                  <div className={`relative w-full ${fromJson?.imageHeight || "h-48"} mb-6`}>
                    <Image 
                      src={item.src} 
                      alt={item.title} 
                      fill 
                      className={`object-cover ${(!item.imagePosition?.includes("%") && item.imagePosition) || "object-center"}`}
                      style={item.imagePosition?.includes("%") ? { objectPosition: item.imagePosition } : undefined}
                    />
                  </div>
                  <div className="flex-1 w-full px-6 pb-6">
                    <h3 className="font-bold text-lg text-[#0f4c81] mb-3 uppercase tracking-wide">{item.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      }
      {
        <div className="mt-12 px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className={`relative w-full ${fromJson?.imageHeight ? fromJson.imageHeight : "h-64 md:h-80"} rounded-xl overflow-hidden`}>
              <Image
                src={fromJson?.faqImage ?? fromJson?.hero?.image ?? "/OKE7.jpeg"}
                alt="Contoh hasil layanan"
                fill
                className={`${fromJson?.imageFit || "object-cover"} ${(!fromJson?.imagePosition?.includes("%") && fromJson?.imagePosition) || "object-center"}`}
                style={fromJson?.imagePosition?.includes("%") ? { objectPosition: fromJson.imagePosition } : undefined}
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Pertanyaan Yang Sering Ditanyakan</h2>
              <p className="text-slate-600 mt-2">Berikut berbagai pertanyaan yang sering ditanyakan pelanggan.</p>
              <Accordion type="single" collapsible className="mt-4">
                {(fromJson?.faq ?? []).map((qa, idx) => (
                  <AccordionItem key={idx} value={`q${idx + 1}`}>
                    <AccordionTrigger>{qa.q}</AccordionTrigger>
                    <AccordionContent>{qa.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      }
      {
        <div className="mt-12 px-6 md:px-12">
          <div className="rounded-xl bg-[#0f4c81] text-white p-8 md:p-12 text-center">
            <h3 className="text-xl md:text-2xl font-bold">
              {fromJson?.cta?.title ?? "Butuh Jasa Profesional Dengan Harga Terjangkau?"}
            </h3>
            <p className="mt-2 opacity-90">
              {fromJson?.cta?.subtitle ?? "Hubungi tim kami untuk mendapatkan penawaran & harga terbaik."}
            </p>
            <div className="mt-6">
              <Button asChild size="lg" className="bg-white text-[#0f4c81] hover:bg-[#0f4c81]/5">
                <a href={fromJson?.cta?.buttonUrl ?? "https://wa.me/6281364520919"} aria-label="Hubungi Us Clean Services">
                  {fromJson?.cta?.buttonText ?? "Hubungi Kami"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      }

    </div>
  )
}
