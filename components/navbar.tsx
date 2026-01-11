"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  serviceData?: any
}

const Navbar = ({ serviceData = {} }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  // Scroll ke atas saat rute berubah
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen)
  }

  // Fungsi untuk menutup menu dan scroll ke atas
  const handleNavClick = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
    window.scrollTo(0, 0)
  }

  // Daftar tautan navigasi
  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Layanan Kami", href: "/layanan-kami/general-cleaning" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Galeri", href: "/galeri" },
    { name: "Hubungi Kami", href: "/hubungi-kami" }, 
  ]

  const serviceLinks = Object.entries(serviceData).length > 0 
    ? Object.entries(serviceData).map(([slug, service]: [string, any]) => ({
        name: service.title.toUpperCase(),
        href: `/layanan-kami/${slug}`
      }))
    : [
        { name: "GENERAL CLEANING", href: "/layanan-kami/general-cleaning" },
        { name: "AC", href: "/layanan-kami/ac" },
        { name: "HYDRO CLEANING", href: "/layanan-kami/hydro-cleaning" },
        { name: "CUCI MOBIL", href: "/layanan-kami/cuci-mobil" },
        { name: "FOGGING", href: "/layanan-kami/fogging" },
        { name: "POLES LANTAI", href: "/layanan-kami/poles-lantai" },
        { name: "OUTDOOR CLEANING", href: "/layanan-kami/outdoor-cleaning" },
        { name: "INDOOR CLEANING", href: "/layanan-kami/indoor-cleaning" },
        { name: "WATER CLEANING", href: "/layanan-kami/water-cleaning" },
        { name: "TOILET CLEANING", href: "/layanan-kami/toilet-cleaning" },
        { name: "KITCHEN CLEANING", href: "/layanan-kami/kitchen-cleaning" },
        { name: "LAYANAN PILIHAN", href: "/layanan-kami/layanan-pilihan" },
      ]

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="-ml-10">
            <Link href="/" className="flex items-center" onClick={handleNavClick}>
              <div className="relative h-16 w-80 md:w-[28rem]">
                <Image
                  src="/images/image.png"
                  alt="US Clean Services"
                  fill
                  className="object-contain object-left mix-blend-multiply"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Navigasi Desktop */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => {
              if (link.name === "Layanan Kami") {
                return (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-slate-700 hover:text-[#0f4c81] px-3 py-2 rounded-md text-sm font-medium transition-colors outline-none">
                      {link.name} <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass rounded-xl border-0 shadow-lg max-h-[80vh] overflow-y-auto">
                      {serviceLinks.map((service) => (
                        <DropdownMenuItem key={service.name} asChild>
                          <Link
                            href={service.href}
                            className="w-full cursor-pointer hover:text-[#0f4c81]"
                            onClick={handleNavClick}
                          >
                            {service.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#0f4c81] font-bold"
                      : "text-slate-700 hover:text-[#0f4c81]"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            <Button asChild className="ml-4 bg-[#0f4c81] hover:bg-[#0b3d6b] text-white">
              <Link href="https://wa.me/6281364520919">Pesan Sekarang</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-[#0f4c81] focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 pt-2 pb-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.name === "Layanan Kami" ? (
                   <div className="space-y-1">
                      <button 
                        onClick={toggleServices}
                        className="flex items-center justify-between w-full px-3 py-2 font-medium text-slate-700 hover:text-[#0f4c81] hover:bg-slate-50 rounded-md"
                      >
                        {link.name}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} 
                        />
                      </button>
                      
                      {isServicesOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 space-y-1 border-l-2 border-slate-100 ml-3"
                        >
                          {serviceLinks.map(service => (
                             <Link
                               key={service.name}
                               href={service.href}
                               className="block px-3 py-2 text-sm text-slate-600 hover:text-[#0f4c81]"
                               onClick={handleNavClick}
                             >
                               {service.name}
                             </Link>
                          ))}
                        </motion.div>
                      )}
                   </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === link.href
                        ? "text-[#0f4c81] bg-slate-50"
                        : "text-slate-700 hover:text-[#0f4c81] hover:bg-slate-50"
                    }`}
                    onClick={handleNavClick}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
             <div className="pt-4">
              <Button asChild className="w-full bg-[#0f4c81] hover:bg-[#0b3d6b] text-white">
                <Link href="https://wa.me/6281364520919" onClick={handleNavClick}>Pesan Sekarang</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
