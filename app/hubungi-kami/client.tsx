"use client"

import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export default function ContactClient({ data }: { data: any }) {
  const contactData = data || {}

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Further reduced padding and text size */}
      <div className="bg-white py-6 text-center text-[#0f4c81]">
        <h1 className="text-2xl font-bold font-nunito mb-1 text-[#0f4c81]">KONTAK KAMI</h1>
        <p className="text-[#0f4c81] text-xs">
          {(contactData.companyName || "Us Clean Services") + (contactData.subtitle ? ` - ${contactData.subtitle}` : "")}
        </p>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 shadow-2xl rounded-xl overflow-hidden bg-[#0f4c81] max-w-5xl mx-auto border border-white/20">
          
          {/* Left Side - Contact Info - Further reduced padding and gaps */}
          <div className="bg-[#0f4c81] text-white p-6 lg:col-span-1 flex flex-col justify-between relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-lg font-bold font-nunito mb-4 border-b border-white/30 pb-1.5 inline-block text-white">
                KONTAK KAMI
              </h2>
              
              <div className="space-y-5 mt-1">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-white/10 p-1 rounded-md text-white">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5 text-white/90 font-nunito tracking-wide">Alamat</p>
                    <p className="text-white text-xs leading-relaxed font-sans tracking-wide opacity-90">
                      {(contactData.addressLines && contactData.addressLines.length > 0
                        ? contactData.addressLines
                        : ["Tanjung Pinang, Indonesia"]
                      ).map((line: string, idx: number) => (
                        <span key={idx}>
                          {line}
                          {idx < (contactData.addressLines?.length || 0) - 1 ? <br /> : null}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-white/10 p-1 rounded-md text-white">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5 text-white/90 font-nunito tracking-wide">Telepon/WhatsApp</p>
                    <p className="text-white text-xs font-sans tracking-widest opacity-90">{contactData.phone || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-white/10 p-1 rounded-md text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5 text-white/90 font-nunito tracking-wide">Email</p>
                    <p className="text-white text-xs font-sans tracking-wide opacity-90">{contactData.email || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-white/10 p-1 rounded-md text-white">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5 text-white/90 font-nunito tracking-wide">Website</p>
                    <p className="text-white text-xs font-sans tracking-wide opacity-90">{contactData.website || "-"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <p className="text-sm font-semibold mb-2 border-b border-white/20 pb-1.5 text-white/90 font-nunito tracking-wide">Sosial Media Kami :</p>
              <div className="flex gap-2">
                <a href={contactData.social?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white hover:text-white p-2 rounded-md transition-colors border border-white/10">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href={contactData.social?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white hover:text-white p-2 rounded-md transition-colors border border-white/10">
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a href={contactData.social?.youtube || "#"} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white hover:text-white p-2 rounded-md transition-colors border border-white/10">
                  <Youtube className="h-3.5 w-3.5" />
                </a>
                <a href={contactData.social?.whatsapp || "#"} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white hover:text-white p-2 rounded-md transition-colors border border-white/10">
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Map - Further reduced height */}
          <div className="lg:col-span-2 min-h-[350px] relative bg-slate-100">
            <iframe 
              src={contactData.mapEmbedUrl || ""}
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
