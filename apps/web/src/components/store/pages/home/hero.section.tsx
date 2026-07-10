import Link from 'next/link'
import Image from 'next/image'

export const HeroSection = () => {
  return (
    <section className="mx-auto max-w-300 px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance text-foreground md:text-6xl">
            Dalua.top:
            <br />
            Your Ritual,
            <br />
            Redefined.
          </h1>
          <p className="text-sm tracking-wide text-muted-foreground">
            Clean formulas for effortless, radiant hair.
          </p>
          <div>
            <Link
              href="/collections"
              className="inline-flex items-center rounded-sm bg-[#8daa91] px-6 py-3 text-xs tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#7d9a81]"
            >
              Shop the Routine
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="relative">
          <div className="aspect-4/5 overflow-hidden rounded-none bg-[#f3f0eb]">
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
