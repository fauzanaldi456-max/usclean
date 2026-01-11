"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Data untuk carousel banner
const bannerData = [
  {
    id: 1,
    title: "Jasa Cleaning Service Terbaik Se-Indonesia",
    description:
      "Bersama Us Clean Services bersih-bersih rumah hingga furnitur hanya dengan satu Klik!",
    image: "/images/profil2.png",
    cta: {
      text: "Lihat Layanan",
      link: "/layanan-kami/general-cleaning",
    },
  },
  {
    id: 2,
    title: "Lihat Hasil Pengerjaan di Galeri",
    description:
      "Jelajahi dokumentasi sebelum–sesudah dan kualitas hasil kerja tim kami untuk berbagai layanan: sofa, kasur, kamar mandi, dapur, dan lainnya.",
    image: "/images/profil3.png",
    cta: {
      text: "Buka Galeri",
      link: "/galeri",
    },
  },
  {
    id: 3,
    title: "Konsultasi Cepat & Penjadwalan Mudah",
    description:
      "Butuh estimasi harga atau jadwal? Hubungi kami untuk konsultasi kebutuhan, rekomendasi layanan, dan penawaran terbaik.",
    image: "/images/profil1.jpg",
    cta: {
      text: "Hubungi Kami",
      link: "https://wa.me/6281364520919",
    },
  },
  
]

const HeroBanner = () => {
  const [current, setCurrent] = useState(0)

  // Fungsi untuk slide otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length)
    }, 9000)

    return () => clearInterval(interval)
  }, [])

  // Fungsi untuk slide manual
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bannerData.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + bannerData.length) % bannerData.length)
  }

  return (
    <section className="relative pb-12 pt-2 md:pb-20 md:pt-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
          {/* Carousel dengan animasi */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30 z-10" />
              <Image
                src={bannerData[current].image || "/placeholder.svg"}
                alt={bannerData[current].title}
                fill
                className="object-cover"
                priority
              />

              {/* Content */}
              <div className="relative z-20 flex flex-col justify-center h-full text-white p-8 md:p-16 max-w-2xl">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4 font-nunito"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {bannerData[current].title}
                </motion.h1>

                <motion.p
                  className="text-white/90 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {bannerData[current].description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {bannerData[current].cta?.text ? (
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#0f4c81] hover:bg-[#0f4c81]/90 text-white inline-flex items-center gap-2"
                    >
                      <Link href={bannerData[current].cta.link}>
                        {bannerData[current].cta.text} <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  ) : null}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {bannerData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-white w-6" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
