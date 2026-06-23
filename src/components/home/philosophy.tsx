import Image from 'next/image'
import { Leaf, Droplets, FlaskConical } from 'lucide-react'

const VALUES = [
  { icon: Leaf, label: 'Vegan & Cruelty-Free' },
  { icon: Droplets, label: 'Sulfate-Free' },
  { icon: FlaskConical, label: 'Botanically Infused' },
]

export default function Philosophy() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug text-foreground mb-6 text-balance">
              Our Philosophy is Simple: Less, but Better.
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-8 max-w-sm">
              We believe in formulating with precision, avoiding unnecessary fillers to let potent actives transform your hair.
            </p>
            <div className="border-t border-border pt-6 flex flex-col gap-5">
              {VALUES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon size={16} strokeWidth={1.5} className="text-[#8daa91] shrink-0" />
                  <span className="text-xs tracking-[0.1em] uppercase text-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square bg-[#f0f0ed] overflow-hidden">
            <Image
              src="/images/botanical-leaves.png"
              alt="Botanical ingredients — pure and natural"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
