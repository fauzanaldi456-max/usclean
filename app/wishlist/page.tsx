// Combined WishlistPage with Contact Section
"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Mail } from "lucide-react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"

// Data wishlist
type WishlistItem = {
  id: number
  title: string
  description: string
  image?: string
  progress: number
  status: "needed" | "fulfilled"
  whatsappNumber: string
}

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    title: "Pemesanan Kue Cakar Ayam",
    description: "Pesan untuk acara keluarga, kantor, atau oleh-oleh khas Tanjung Pinang.",
    image: "/OKE1.png",
    progress: 70,
    status: "needed",
    whatsappNumber: "6281372377185",
  },
  {
    id: 2,
    title: "Kerja Sama Reseller",
    description: "Ingin jadi reseller? Dapatkan harga khusus dan pengiriman rutin.",
    image: "/OKE2.png",
    progress: 40,
    status: "needed",
    whatsappNumber: "6281372377185",
  },
  {
    id: 3,
    title: "Pesanan Partai Besar",
    description: "Melayani pesanan banyak dengan jadwal produksi dan pengantaran.",
    image: "/OKE7.jpeg",
    progress: 100,
    status: "fulfilled",
    whatsappNumber: "6281372377185",
  },
]

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} satisfies Variants

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Wishlist Section */}
      <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={fadeInUp}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-nunito text-slate-800">
          Contact <span className="text-[#0f4c81]">Kue Cakar Ayam</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
        Kami senang mendengar dari Anda! Baik untuk pemesanan, saran, atau sekadar bertanya seputar Kue Cakar Ayam, Anda dapat menghubungi kami kapan saja melalui WhatsApp atau email.
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={staggerContainer}>
        {wishlistItems.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <Card className={`card-hover-effect glass rounded-2xl shadow-lg border-0 overflow-hidden h-full ${item.status === "fulfilled" ? "opacity-75" : ""}`}>
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className={item.status === "needed" ? "bg-[#0f4c81]" : "bg-[#0f4c81]/70"}>{item.status === "needed" ? "Dibutuhkan" : "Terpenuhi"}</Badge>
                </div>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold font-nunito">{item.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium text-[#0f4c81]">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2 bg-slate-200" indicatorClassName={item.status === "fulfilled" ? "bg-teal-500" : "bg-[#0f4c81]"} />
                </div>
              </CardContent>
              <CardFooter>
                <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild className={`w-full rounded-xl ${item.status === "needed" ? "bg-[#0f4c81] hover:bg-[#0b3d6b]" : "bg-teal-500 hover:bg-teal-600"}`} disabled={item.status === "fulfilled"}>
                    <a href={`https://wa.me/${item.whatsappNumber}?text=Halo,%20saya%20ingin%20bertanya%20tentang%20${encodeURIComponent(item.title)}%20dari%20Kue%20Cakar%20Ayam.`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {item.status === "needed" ? "Saya Ingin Membantu" : "Sudah Terpenuhi"}
                    </a>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Section */}
      <motion.section id="contact" className="mt-20 mb-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}>
        <h2 className="text-3xl font-bold text-center mb-10 font-nunito text-slate-800">
          Hubungi <span className="text-[#0f4c81]">Kami</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="glass rounded-2xl shadow-lg border-0 overflow-hidden h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-14 h-14 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mb-4 shadow-md">
                <MessageSquare className="h-7 w-7 text-[#0f4c81]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-nunito">WhatsApp</h3>
              <p className="text-slate-600 mb-6 flex-grow">Hubungi admin Kue Cakar Ayam melalui WhatsApp untuk pertanyaan, saran, atau informasi lebih lanjut.</p>
              <Button asChild className="bg-[#0f4c81] hover:bg-[#0b3d6b] w-full rounded-xl">
                <a href="https://wa.me/6281364520919" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-4 w-4" /> Hubungi Via WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card className="glass rounded-2xl shadow-lg border-0 overflow-hidden h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="w-14 h-14 rounded-full bg-[#0f4c81]/10 flex items-center justify-center mb-4 shadow-md">
                <Mail className="h-7 w-7 text-[#0f4c81]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-nunito">Email</h3>
              <p className="text-slate-600 mb-6 flex-grow">Kirim email kepada tim Kue Cakar Ayam untuk kerjasama, pertanyaan detail, atau hal lainnya.</p>
              <Button asChild className="bg-[#0f4c81] hover:bg-[#0b3d6b] w-full rounded-xl">
                <a href="mailto:kuecakarayam@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Email Kami
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  )
}
