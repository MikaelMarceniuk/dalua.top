import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-balance text-foreground">
            LUMINA:<br />
            Your Ritual,<br />
            Redefined.
          </h1>
          <p className="text-sm tracking-wide text-muted-foreground">
            Clean formulas for effortless, radiant hair.
          </p>
          <div>
            <Link
              href="/collections"
              className="inline-flex items-center px-6 py-3 bg-[#8daa91] text-white text-xs tracking-[0.12em] uppercase hover:bg-[#7d9a81] transition-colors rounded-sm"
            >
              Shop the Routine
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="relative">
          <div className="aspect-[4/5] bg-[#f3f0eb] rounded-none overflow-hidden">
            <Image
              src="/images/hero-products.png"
              alt="Lumina haircare collection — nourishing cream and luminous hair oil"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
