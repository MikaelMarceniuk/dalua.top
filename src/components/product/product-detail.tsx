'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
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
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-xs tracking-[0.12em] uppercase font-medium text-foreground">
          {title}
        </span>
        {open ? (
          <ChevronDown size={16} strokeWidth={1.5} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={16} strokeWidth={1.5} className="text-muted-foreground rotate-[-90deg] transition-transform" />
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
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-10">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/" className="hover:text-foreground transition-colors">Shop All</Link>
        <span>/</span>
        <span className="text-foreground">{product.name.toUpperCase()}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] bg-[#f3f0eb] overflow-hidden">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="absolute top-4 left-4 z-10 text-[10px] tracking-[0.1em] uppercase border border-foreground/30 px-2.5 py-1 bg-background text-foreground"
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
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3 text-pretty">
            {product.subtitle || product.name}
          </h1>
          <p className="text-xl font-medium text-foreground mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground mb-8">
            {product.description}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-10">
            {/* Quantity stepper */}
            <div className="flex items-center border border-border h-12 rounded-sm">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-12 h-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span className="w-10 text-center text-sm text-foreground">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-12 h-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className="flex-1 h-12 bg-[#8daa91] hover:bg-[#7d9a81] text-white text-xs tracking-[0.14em] uppercase transition-colors rounded-sm"
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
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#8daa91] shrink-0" />
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
                    <p className="font-medium text-foreground mb-1">{q}</p>
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
