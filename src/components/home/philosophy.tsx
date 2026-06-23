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
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* Text */}
          <div>
            <h2 className="mb-6 text-3xl leading-snug font-semibold tracking-tight text-balance text-foreground md:text-4xl">
              Our Philosophy is Simple: Less, but Better.
            </h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We believe in formulating with precision, avoiding unnecessary
              fillers to let potent actives transform your hair.
            </p>
            <div className="flex flex-col gap-5 border-t border-border pt-6">
              {VALUES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#8daa91]"
                  />
                  <span className="text-xs tracking-[0.1em] text-foreground uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-[#f0f0ed]">
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
