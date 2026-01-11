import Image from "next/image"

const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Jasa Kebersihan <span className="text-[#0f4c81]">Profesional</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Kami membantu menjaga rumah dan kantor tetap bersih, rapi, dan nyaman dengan layanan yang bisa dijadwalkan sesuai kebutuhan.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Warga Tanjung Pinang"
                width={600}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
