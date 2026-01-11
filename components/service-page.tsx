import Image from "next/image"

type Props = {
  title: string
  description: string
  image: string
  gallery?: string[]
  sections?: string[]
}

export default function ServicePage({ title, description, image, gallery, sections }: Props) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <div className="h-1 bg-[#0f4c81] mt-2 mb-6" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div>
          <p className="text-slate-700 leading-relaxed">{description}</p>
          {sections && sections.length > 0 && (
            <div className="mt-4 space-y-3">
              {sections.map((s, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      {gallery && gallery.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="relative w-full h-32 rounded-lg overflow-hidden">
              <Image src={src} alt={`${title} ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
