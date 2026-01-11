import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Youtube } from "lucide-react"

interface FooterProps {
  contactData?: any
  serviceData?: any
}

const Footer = ({ contactData = {}, serviceData = {} }: FooterProps) => {
  const services = Object.entries(serviceData).map(([slug, service]: [string, any]) => ({
    name: service.title,
    href: `/layanan-kami/${slug}`,
  })).slice(0, 5) // Show top 5 or so

  return (
    <footer className="bg-[#0f4c81] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-white font-nunito">{contactData.companyName || "US Clean Services"}</h3>
            <p className="text-white/70 text-xs font-sans tracking-wide leading-relaxed opacity-90 whitespace-pre-line">
              Pertama & satu-satunya di Tanjunggpinang.{"\n"}
              Layanan kebersihan profesional untuk Rumah, Kost, Kantor, Ruko dan lain lain.{"\n"}
              Semua properti, satu solusi bersih 
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white font-nunito">Layanan</h4>
            <ul className="space-y-2">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="text-white/70 hover:text-white transition-colors text-xs font-sans tracking-wide opacity-90">
                      {service.name}
                    </Link>
                  </li>
                ))
              ) : (
                 <li>
                    <Link href="/layanan-kami/general-cleaning" className="text-white/70 hover:text-white transition-colors text-xs font-sans tracking-wide opacity-90">
                      Layanan Kami
                    </Link>
                  </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white font-nunito">Tentang Kami</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tentang-kami" className="text-white/70 hover:text-white transition-colors text-xs font-sans tracking-wide opacity-90">
                  Cerita Kami
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-white/70 hover:text-white transition-colors text-xs font-sans tracking-wide opacity-90">
                 Layanan Kami
                </Link>
              </li>
              <li>
                 <Link href="https://wa.me/6281364520919" className="text-white/70 hover:text-white transition-colors text-xs font-sans tracking-wide opacity-90">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white font-nunito">Hubungi Kami</h4>
            <div className="space-y-2 mb-4">
              {(contactData.addressLines || ["Tanjung Pinang, Indonesia"]).map((line: string, i: number) => (
                <p key={i} className="text-white/70 text-xs font-sans tracking-wide opacity-90">{line}</p>
              ))}
              {contactData.phone && (
                 <p className="text-white/70 text-xs font-sans tracking-wide opacity-90">{contactData.phone}</p>
              )}
               {contactData.email && (
                 <p className="text-white/70 text-xs font-sans tracking-wide opacity-90">{contactData.email}</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              {contactData.social?.facebook && (
                <a href={contactData.social.facebook} className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {contactData.social?.instagram && (
                <a href={contactData.social.instagram} className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {contactData.social?.twitter && (
                <a href={contactData.social.twitter} className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
               {contactData.social?.youtube && (
                <a href={contactData.social.youtube} className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                  <span className="sr-only">Youtube</span>
                </a>
              )}
              {contactData.social?.whatsapp && (
                <a href={contactData.social.whatsapp} className="text-white/70 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <Phone size={20} />
                  <span className="sr-only">WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p className="text-xs font-sans tracking-wide opacity-80">&copy; {new Date().getFullYear()} {contactData.companyName || "Us Clean Services"}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
