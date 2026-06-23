import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/mock/product.mock'

export default function Collection() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl font-medium tracking-[0.08em] text-foreground mb-2">
            The Collection
          </h2>
          <p className="text-sm text-muted-foreground tracking-wide">
            Artisanal science meets pure botanical power.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PRODUCTS.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] bg-[#f3f0eb] overflow-hidden mb-6">
                {i === 0 && (
                  <span className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.1em] uppercase border border-foreground/30 px-2 py-1 bg-background text-foreground">
                    New
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-base font-medium tracking-wide text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {i === 0
                    ? 'Defines and hydrates with botanical squalane.'
                    : 'Seals split ends and imparts glass-like shine.'}
                </p>
                <span className="text-xs tracking-[0.1em] uppercase border-b border-foreground/40 pb-0.5 text-foreground hover:border-foreground transition-colors">
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
