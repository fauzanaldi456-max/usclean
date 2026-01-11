"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Data Galeri Type
export type GalleryItem = {
  id: number
  title: string
  category: string
  image: string
  description: string
  featured?: boolean
}

// Animasi
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

interface GalleryClientProps {
  initialItems: GalleryItem[]
}

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua")
  const galleryItems = initialItems

  const categories = ["Semua", ...Array.from(new Set(galleryItems.map(i => i.category))).sort()]

  const filteredItems = activeCategory === "Semua" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalis */}
      <div className="pt-20 pb-10 text-center px-4">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-nunito text-[#0f4c81] tracking-tight">
            Galeri Kebersihan
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Lihat bagaimana kami mengubah ruangan kusam menjadi bersih bersinar. 
            Bukti kualitas layanan Us Clean yang sesungguhnya.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Filter Tabs Scrollable */}
        <motion.div 
          className="mb-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="Semua" className="w-full">
            {/* Wrapper untuk scroll */}
            <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <TabsList className="bg-transparent h-auto flex justify-start w-max gap-3 p-0 pr-10">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-300 whitespace-nowrap
                      data-[state=active]:bg-[#0f4c81] data-[state=active]:text-white data-[state=active]:border-[#0f4c81] data-[state=active]:shadow-lg
                      ${activeCategory === cat 
                        ? "bg-[#0f4c81] text-white border-[#0f4c81] shadow-lg scale-105" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"}
                    `}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </motion.div>

        {/* Bento Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer
                    ${item.featured && activeCategory === "Semua" ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"}
                  `}
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Badge className="bg-[#0f4c81]/90 hover:bg-[#0f4c81] text-white border-0 mb-3 backdrop-blur-sm">
                        {item.category}
                      </Badge>
                      <h3 className={`font-bold font-nunito leading-tight mb-2 ${item.featured && activeCategory === "Semua" ? "text-3xl" : "text-xl"}`}>
                        {item.title}
                      </h3>
                      <p className={`text-slate-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-sm`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300"
              >
                <div className="mx-auto w-16 h-16 bg-[#0f4c81]/20 rounded-full flex items-center justify-center mb-4">
                  {/* Fallback icon if image is missing, or just use lucide */}
                  <svg className="w-8 h-8 text-[#0f4c81]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Belum Ada Dokumentasi</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Dokumentasi untuk kategori <span className="font-bold text-[#0f4c81]">{activeCategory}</span> akan segera kami update.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
