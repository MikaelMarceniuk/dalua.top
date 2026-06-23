import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/mock/product.mock'

export default function Collection() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-2 text-2xl font-medium tracking-[0.08em] text-foreground">
            The Collection
          </h2>
          <p className="text-sm tracking-wide text-muted-foreground">
            Artisanal science meets pure botanical power.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-[#f3f0eb]">
                {i === 0 && (
                  <span className="absolute top-4 left-4 z-10 border border-foreground/30 bg-background px-2 py-1 text-[10px] tracking-[0.1em] text-foreground uppercase">
                    New
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="mb-1 text-base font-medium tracking-wide text-foreground">
                  {product.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {i === 0
                    ? 'Defines and hydrates with botanical squalane.'
                    : 'Seals split ends and imparts glass-like shine.'}
                </p>
                <span className="border-b border-foreground/40 pb-0.5 text-xs tracking-[0.1em] text-foreground uppercase transition-colors hover:border-foreground">
                  Discover More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
