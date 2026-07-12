'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconArrowRight,
  IconLock,
  IconMinus,
  IconPlus,
  IconShoppingBag,
} from '@tabler/icons-react'
import { useStore } from '@/components/providers/store.provider'

const SHIPPING_OPTIONS = [
  { id: 'home', label: 'Home', address: '123 Serenity Lane, NY 10001' },
  {
    id: 'atelier',
    label: 'Atelier Pickup',
    address: '456 Artisan Blvd, NY 10012',
  },
]

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()
  const [shipping, setShipping] = useState('home')

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-300 px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <IconShoppingBag
            size={40}
            strokeWidth={1}
            className="text-muted-foreground"
          />
          <h1 className="text-2xl font-medium tracking-wide text-foreground">
            Your Atelier Bag is Empty
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover our artisanal collection and begin your ritual.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-sm bg-[#8daa91] px-8 py-3 text-xs tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#7d9a81]"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-300 px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
          Secure Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Review your items and complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">
        {/* Left — Bag Items */}
        <div>
          <h2 className="mb-6 text-xs font-medium tracking-[0.12em] text-foreground uppercase">
            Your Atelier Bag
          </h2>

          <div className="flex flex-col">
            {cart.map((item) => (
              <div key={item.product.id}>
                <div className="flex items-start gap-5 py-6">
                  {/* Product image */}
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[#f3f0eb]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-0.5 text-sm font-medium text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.product.size}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-medium text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex h-9 items-center rounded-sm border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-full w-9 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                          aria-label="Decrease quantity"
                        >
                          <IconMinus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-full w-9 items-center justify-center text-foreground transition-colors hover:bg-secondary"
                          aria-label="Increase quantity"
                        >
                          <IconPlus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[10px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border" />
              </div>
            ))}
          </div>
        </div>

        {/* Right — Order Summary */}
        <div>
          <div className="sticky top-24 border border-border p-8">
            <h2 className="mb-6 text-base font-medium tracking-wide text-foreground">
              Order Summary
            </h2>

            {/* Shipping destination */}
            <div className="mb-6">
              <p className="mb-3 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                Shipping Destination
              </p>
              <div className="flex flex-col gap-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
                      shipping === opt.id
                        ? 'border-foreground'
                        : 'border-border hover:border-foreground/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="mt-0.5 accent-[#8daa91]"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {opt.address}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5 flex flex-col gap-3 border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-sm text-foreground">Complimentary</span>
              </div>
            </div>

            <div className="mb-8 flex items-center justify-between border-t border-border pt-5">
              <span className="text-base font-medium text-foreground">
                Total
              </span>
              <span className="text-xl font-semibold text-foreground">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button className="flex h-13 w-full items-center justify-center gap-2 rounded-sm bg-[#8daa91] py-4 text-xs tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#7d9a81]">
              Proceed to Payment
              <IconArrowRight size={14} strokeWidth={1.5} />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-wide text-muted-foreground">
              <IconLock size={11} strokeWidth={1.5} />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
