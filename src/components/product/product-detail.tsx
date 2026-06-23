'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Minus, Plus } from 'lucide-react'
import { type Product, useStore } from '@/lib/store'

interface AccordionProps {
  title: string
  children: React.ReactNode
}

function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-xs font-medium tracking-[0.12em] text-foreground uppercase">
          {title}
        </span>
        {open ? (
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="text-muted-foreground"
          />
        ) : (
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="rotate-[-90deg] text-muted-foreground transition-transform"
          />
        )}
      </button>
      {open && (
        <div className="pb-6 text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  )
}

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useStore()

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-2 text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/" className="transition-colors hover:text-foreground">
          Shop All
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name.toUpperCase()}</span>
      </nav>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f0eb]">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="absolute top-4 left-4 z-10 border border-foreground/30 bg-background px-2.5 py-1 text-[10px] tracking-[0.1em] text-foreground uppercase"
              >
                {tag}
              </span>
            ))}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="mb-3 text-3xl font-semibold tracking-tight text-pretty text-foreground md:text-4xl">
            {product.subtitle || product.name}
          </h1>
          <p className="mb-6 text-xl font-medium text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="mb-10 flex items-center gap-4">
            {/* Quantity stepper */}
            <div className="flex h-12 items-center rounded-sm border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-full w-12 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-sm text-foreground">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-full w-12 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className="h-12 flex-1 rounded-sm bg-[#8daa91] text-xs tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#7d9a81]"
            >
              {added ? 'Added to Bag' : 'Add to Cart'}
            </button>
          </div>

          <div className="border-t border-border" />

          {/* Accordions */}
          <div className="mt-2">
            <Accordion title="Benefits">
              <ul className="flex flex-col gap-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8daa91]" />
                    {b}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Ingredients">
              <p>{product.ingredients}</p>
            </Accordion>
            <Accordion title="How to Use">
              <p>{product.howToUse}</p>
            </Accordion>
            <Accordion title="FAQ">
              <div className="flex flex-col gap-4">
                {product.faq.map(({ q, a }) => (
                  <div key={q}>
                    <p className="mb-1 font-medium text-foreground">{q}</p>
                    <p>{a}</p>
                  </div>
                ))}
              </div>
            </Accordion>
          </div>
          <div className="border-t border-border" />
        </div>
      </div>
    </div>
  )
}
