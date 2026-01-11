"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Sparkles, MapPin, Users, CheckCircle, Home, Shield } from "lucide-react"
import * as LucideIcons from "lucide-react"

// Animasi untuk elemen yang muncul saat scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} satisfies Variants

export default function AboutClient({ data }: { data: any }) {
  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || Sparkles
    return <Icon className="w-8 h-8" />
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header Section with Blue Background */}
      <section className="bg-[#0f4c81] py-16 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div className="text-center" initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-nunito text-white leading-tight">
              {data.header?.title}
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {data.header?.subtitle}
            </h2>
            <p className="text-white/90 max-w-3xl mx-auto leading-relaxed">
              {data.header?.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 pb-12 pt-24">
      {/* Our Story Section */}
      <motion.section
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg -translate-y-8 md:-translate-y-16 max-w-[280px] mx-auto">
            <Image 
              src={data.story?.image || "/OKE7.jpeg"} 
              alt="Tim Us Clean" 
              width={1664}
              height={2496}
              className="w-full h-auto scale-[1.15]"
            />
          </div>
          <div className="md:-translate-y-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-nunito text-[#0f4c81]">
              {data.story?.heading}
            </h2>
            {data.story?.paragraphs?.map((p: string, i: number) => (
              <p key={i} className="text-slate-600 mb-6 leading-relaxed text-justify last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </motion.section>
      </div>

      {/* Statistik & Info Section (Blue Background) */}
      <section className="w-full bg-[#0f4c81] py-20 text-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-12">
              {data.stats?.map((stat: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <h3 className="text-4xl font-bold mb-3 font-nunito flex items-center gap-3">
                    {getIcon(stat.icon)}
                    {stat.count}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Illustration */}
            <motion.div 
              className="flex justify-center items-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Circle Icons Composition */}
              <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                 {/* Central Mascot Placeholder (Shield/Home Icon) */}
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                      <Home className="w-20 h-20 text-[#0f4c81]" />
                    </div>
                 </div>
                 
                 {/* Orbiting Icons */}
                 <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/20 p-3 rounded-full backdrop-blur-sm animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                 </div>
                 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/20 p-3 rounded-full backdrop-blur-sm animate-pulse delay-700">
                    <Shield className="w-8 h-8 text-white" />
                 </div>
                 <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur-sm animate-pulse delay-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                 </div>
                 <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur-sm animate-pulse delay-500">
                    <MessageSquare className="w-8 h-8 text-white" />
                 </div>

                 {/* Decorative Circles */}
                 <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-full animate-spin-slow"></div>
                 <div className="absolute inset-16 border-2 border-white/20 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Komitmen Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-nunito text-[#0f4c81] leading-tight">
                {data.commitment?.heading}
              </h2>
              {data.commitment?.paragraphs?.map((p: string, i: number) => (
                <p key={i} className="text-slate-600 mb-6 leading-relaxed font-sans tracking-wide last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Image Content */}
            <motion.div 
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Image 
                src={data.commitment?.image || "/about-team.jpg"} 
                alt="Tim Profesional Us Clean" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="bg-[#0f4c81] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
              {/* Text & Buttons */}
              <div className="text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-nunito leading-tight">
                  {data.cta?.heading}
                </h2>
                <p className="text-white/90 mb-10 max-w-xl">
                  {data.cta?.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-white hover:bg-[#0f4c81]/5 text-[#0f4c81] px-8 py-6 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    {data.cta?.partnerButton}
                  </Button>
                  
                  <Button 
                    className="bg-white hover:bg-[#0f4c81]/5 text-[#0f4c81] px-8 py-6 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {data.cta?.helperButton}
                  </Button>
                </div>
              </div>

              {/* Image Illustration */}
              <div className="relative h-[200px] lg:h-[280px] hidden lg:block mt-8 lg:mt-0 w-full ml-auto">
                <Image
                  src={data.cta?.image || "/about-team.jpg"}
                  alt="Tim Us Clean"
                  fill
                  className="object-contain object-bottom scale-[1.6] origin-bottom translate-y-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
