"use client"

import Link from "next/link"
import Image from "next/image"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, type Variants } from "framer-motion"
import HeroBanner from "@/components/hero-banner"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Animasi untuk elemen yang muncul saat scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} satisfies Variants

export default function HomeClient({ data, serviceData }: { data: any, serviceData: any }) {
  const getIcon = (name: string, className?: string) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Sparkles
    return <Icon className={className || "w-6 h-6"} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />

      {/* Intro Section sesuai desain */}
      <motion.section
        className="my-16 container mx-auto px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative pl-6 pb-6">
             {/* Decorative Border */}
             <div className="absolute left-0 bottom-0 w-3/4 h-3/4 border-l-[12px] border-b-[12px] border-[#0f4c81] -z-10"></div>
             
             {/* Main Image */}
             <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[350px] md:h-[400px]">
               <Image 
                 src={data.intro?.image || "/OKE7.jpeg"} 
                 alt="Layanan kebersihan profesional" 
                 fill 
                 className="object-cover"
               />
             </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-[#0f4c81] mb-6 font-nunito">
              {data.intro?.title}
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed text-justify">
              {data.intro?.description1}
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-justify">
              {data.intro?.description2}
            </p>
            <Button asChild className="bg-[#0f4c81] hover:bg-[#0b3d6b] text-white px-8 py-6 rounded">
              <Link href={data.intro?.buttonLink || "https://wa.me/6281364520919"}>{data.intro?.buttonText}</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Layanan Carousel Section */}
      <section
        className="my-16 container mx-auto px-4"
      >
        <div className="text-center mb-10">
           <h2 className="text-3xl font-bold text-[#0f4c81] font-nunito">{data.layananSection?.title}</h2>
           <p className="text-slate-600 mt-2">{data.layananSection?.subtitle}</p>
        </div>
        
        <div className="px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {Object.entries(serviceData).map(([slug, service]: [string, any]) => (
                <CarouselItem key={slug} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="h-full">
                    <Card className="h-full border-[#0f4c81]/20 hover:border-[#0f4c81] transition-colors duration-300 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md">
                      <CardContent className="flex flex-col items-center p-0 text-center h-full">
                        <div className={`relative w-full ${service.imageHeight || "h-48"} mb-6`}>
                           <Image 
                             src={service.image || "/placeholder.jpg"}  
                             alt={service.title} 
                             fill 
                             className={`${service.imageFit || "object-cover"} ${service.imagePosition || "object-center"}`}
                           />
                        </div>
                        <div className="flex-1 w-full px-6">
                          <h3 className="font-bold text-lg text-[#0f4c81] mb-3 uppercase tracking-wide">{service.title}</h3>
                          <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                            {service.description}
                          </p>
                        </div>
                        <div className="w-full px-6 pb-6">
                          <Button asChild variant="outline" className="w-full border-[#0f4c81]/20 text-[#0f4c81] hover:bg-[#0f4c81] hover:text-white transition-all">
                            <Link href={`/layanan-kami/${slug}`}>Detail Layanan</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        </div>
      </section>

      {/* CTA Banner Section - Mid Page */}
      <section className="bg-[#0f4c81] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-nunito">
            {data.cta?.title}
          </h2>
          <p className="text-white/80 mb-8 max-w-3xl mx-auto">
            {data.cta?.description}
          </p>
          <Button asChild className="bg-white text-[#0f4c81] hover:bg-[#0f4c81]/10 px-8 py-6 rounded inline-flex items-center gap-2 font-bold">
            <Link href="https://wa.me/6281364520919">
              <LucideIcons.MessageCircle className="w-5 h-5" />
              {data.cta?.buttonText}
            </Link>
          </Button>
        </div>
      </section>

      {/* 4 Alasan Memilih Section */}
      <motion.section
        className="my-20 container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f4c81] mb-4 font-nunito">
            {data.reasons?.title}
          </h2>
          <p className="text-slate-600">
            {data.reasons?.description}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {data.reasons?.items?.map((item: any, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-[#0f4c81] text-white p-8 rounded-lg text-center flex flex-col items-center hover:bg-[#0b3d6b] transition-colors duration-300 shadow-lg"
            >
              {getIcon(item.icon, "w-12 h-12 mb-6 text-white")}
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
         {/* Background decoration dots (optional/simple) */}
         <div className="absolute top-0 right-0 p-12 opacity-10">
           <div className="w-32 h-32 bg-[radial-gradient(#0f4c81_1px,transparent_1px)] [background-size:16px_16px]"></div>
         </div>
         <div className="absolute bottom-0 left-0 p-12 opacity-10">
           <div className="w-32 h-32 bg-[radial-gradient(#0f4c81_1px,transparent_1px)] [background-size:16px_16px]"></div>
         </div>

         <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f4c81] mb-4 font-nunito">
              {data.testimonials?.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {data.testimonials?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials?.items?.map((testi: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative hover:shadow-md transition-shadow"
              >
                <LucideIcons.Quote className="absolute top-6 right-6 w-8 h-8 text-[#0f4c81]/20" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                    <Image src={testi.image || "/placeholder-user.jpg"} alt={testi.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f4c81]">{testi.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{testi.role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(testi.stars || 5)].map((_, s) => (
                        <LucideIcons.Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed relative z-10">
                  &quot;{testi.quote}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitra & Pelanggan Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0f4c81] mb-4 font-nunito">
            {data.partners?.title}
          </h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            {data.partners?.description}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-90">
             {data.partners?.items?.map((partner: any, idx: number) => (
               <div key={idx} className="flex flex-col md:flex-row items-center gap-3 group transition-all duration-300 cursor-default">
                 {partner.image ? (
                  <div className="relative w-48 h-48">
                    <Image src={partner.image} alt={partner.name} fill className="object-contain" />
                  </div>
                ) : (
                   getIcon(partner.icon, "w-10 h-10 text-slate-400 group-hover:text-[#0f4c81] transition-colors")
                 )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 font-nunito">
              {data.programSection?.title ?? "Program"}
            </h2>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              {(Array.isArray(data.programSection?.items) && data.programSection.items.length
                ? data.programSection.items
                : [
                    {
                      title: "Apa itu Us Clean Services?",
                      desc: "Us Clean Services adalah platform penyedia layanan jasa kebersihan untuk rumah Anda.",
                    },
                    {
                      title: "Jenis bangunan apa saja yang dapat menggunakan layanan General Cleaning?",
                      desc: "General Cleaning merupakan layanan perawatan dan pembersihan rutin secara berkala untuk rumah, apartemen, kantor dan tempat usaha kamu.",
                    },
                    {
                      title: "Apa jadwal yang sudah dipesan dapat diubah?",
                      desc: "Ya, jadwal bisa diubah! Silakan hubungi Customer Service kami di 0813 6452 0919. Namun, syarat dan ketentuan berlaku: Perubahan jadwal dapat dilakukan maksimal 1 hari sebelum hari layanan.",
                    },
                    {
                      title: "Apakah ada garansi untuk layanan AC Cleaning?",
                      desc: "Garansi cuci AC adalah 7 hari setelah pengerjaan (hanya untuk kebocoran). Garansi Overhaul AC (cuci besar), isi dan tambah freon adalah 14 hari setelah pengerjaan.",
                    },
                  ]
              ).map((item: any, idx: number) => (
                <AccordionItem
                  key={idx}
                  value={`program-${idx}`}
                  className="mb-6 rounded-lg border border-slate-200 bg-white px-6 border-b-0"
                >
                  <AccordionTrigger className="py-5 text-base md:text-lg font-semibold text-slate-900 hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-slate-700 leading-relaxed">
                    {item.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
