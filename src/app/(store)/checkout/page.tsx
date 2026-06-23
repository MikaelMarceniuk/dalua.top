'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ArrowRight, Lock, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'
import { CheckoutFooter } from '@/components/footer'

const SHIPPING_OPTIONS = [
  { id: 'home', label: 'Home', address: '123 Serenity Lane, NY 10001' },
  { id: 'atelier', label: 'Atelier Pickup', address: '456 Artisan Blvd, NY 10012' },
]

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()
  const [shipping, setShipping] = useState('home')

  if (cart.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <ShoppingBag size={40} strokeWidth={1} className="text-muted-foreground" />
          <h1 className="text-2xl font-medium tracking-wide text-foreground">
            Your Atelier Bag is Empty
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover our artisanal collection and begin your ritual.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3 bg-[#8daa91] text-white text-xs tracking-[0.12em] uppercase hover:bg-[#7d9a81] transition-colors rounded-sm"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
          Secure Checkout
        </h1>
        <p className="text-sm text-muted-foreground">
          Review your items and complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
        {/* Left — Bag Items */}
        <div>
          <h2 className="text-xs tracking-[0.12em] uppercase font-medium text-foreground mb-6">
            Your Atelier Bag
          </h2>

          <div className="flex flex-col">
            {cart.map((item, i) => (
              <div key={item.product.id}>
                <div className="flex items-start gap-5 py-6">
                  {/* Product image */}
                  <div className="relative w-20 h-24 bg-[#f3f0eb] shrink-0 overflow-hidden">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-foreground mb-0.5">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.product.size}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-foreground shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center border border-border h-9 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-9 h-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-9 h-full flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
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
          <div className="border border-border p-8 sticky top-24">
            <h2 className="text-base font-medium tracking-wide text-foreground mb-6">
              Order Summary
            </h2>

            {/* Shipping destination */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-3">
                Shipping Destination
              </p>
              <div className="flex flex-col gap-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 border p-4 cursor-pointer transition-colors ${
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
                      <p className="text-sm font-medium text-foreground">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.address}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-5 flex flex-col gap-3 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-sm text-foreground">Complimentary</span>
              </div>
            </div>

            <div className="border-t border-border pt-5 flex justify-between items-center mb-8">
              <span className="text-base font-medium text-foreground">Total</span>
              <span className="text-xl font-semibold text-foreground">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 h-13 bg-[#8daa91] hover:bg-[#7d9a81] text-white text-xs tracking-[0.14em] uppercase transition-colors rounded-sm py-4">
              Proceed to Payment
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] tracking-wide text-muted-foreground">
              <Lock size={11} strokeWidth={1.5} />
              <span>Secure SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
