'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutDashboard,
  ClipboardList,
  MapPin,
  CreditCard,
  Settings,
  Plus,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Order History', icon: ClipboardList },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const ORDER_STEPS = [
  { label: 'Ordered', done: true },
  { label: 'Shipped', done: true },
  { label: 'Out for Delivery', done: false },
  { label: 'Delivered', done: false },
]

const ADDRESSES = [
  {
    id: 'home',
    type: 'Home',
    name: 'Sarah Jenkins',
    line1: '1245 Serenity Lane, Apt 3B',
    line2: 'Portland, OR 97209',
    primary: true,
  },
  {
    id: 'atelier',
    type: 'Atelier',
    name: 'Sarah Jenkins',
    line1: '88 Design District Blvd',
    line2: 'Portland, OR 97214',
    primary: false,
  },
]

export default function AccountPage() {
  const [activeNav, setActiveNav] = useState('overview')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-0 md:px-6 py-0 md:py-10">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-56 md:shrink-0 border-b md:border-b-0 md:border-r border-border">
            <div className="px-6 py-8 md:py-10">
              <p className="text-sm font-semibold text-foreground">My Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Manage your wellness rituals</p>
            </div>
            <nav className="pb-8">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveNav(id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-6 py-3 text-left text-sm transition-colors',
                    activeNav === id
                      ? 'text-foreground border-l-2 border-foreground font-medium bg-secondary/40'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/20 border-l-2 border-transparent'
                  )}
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 px-6 py-8 md:py-10 md:pl-12">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
              Welcome back, Sarah.
            </h1>
            <p className="text-sm text-muted-foreground mb-10">
              Here is a summary of your recent activity and saved preferences.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
              {/* Left column */}
              <div className="flex flex-col gap-6">
                {/* Recent Order Card */}
                <div className="border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-medium text-foreground">Recent Order</h2>
                    <span className="text-xs tracking-wide text-muted-foreground">#LUM-8492</span>
                  </div>

                  {/* Order tracker */}
                  <div className="relative flex items-center justify-between mb-6">
                    {/* Progress line */}
                    <div className="absolute top-3 left-0 right-0 h-px bg-border" />
                    <div
                      className="absolute top-3 left-0 h-px bg-[#8daa91] transition-all"
                      style={{ width: '35%' }}
                    />
                    {ORDER_STEPS.map((step, i) => (
                      <div key={step.label} className="relative flex flex-col items-center gap-2 z-10">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full border-2 flex items-center justify-center bg-background',
                            step.done
                              ? 'border-[#8daa91] bg-[#8daa91]'
                              : 'border-border'
                          )}
                        >
                          {step.done && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="text-[10px] tracking-wide text-muted-foreground text-center leading-tight">
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-center text-muted-foreground border-t border-border pt-4">
                    Estimated delivery: Tomorrow, by 8:00 PM
                  </p>
                </div>

                {/* Replenish card */}
                <div className="border border-border p-6">
                  <div className="flex items-start gap-5">
                    <div className="relative w-24 h-24 bg-[#8daa91]/10 overflow-hidden shrink-0">
                      <Image
                        src="/images/luminous-hair-oil.png"
                        alt="Luminous Hair Oil"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block text-[10px] tracking-[0.1em] uppercase border border-border px-2 py-0.5 text-muted-foreground mb-2">
                        Replenish
                      </span>
                      <h3 className="text-base font-medium text-foreground mb-1">
                        Luminous Hair Oil
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        Your daily ritual for deep hydration and shine.
                      </p>
                      <Link
                        href="/products/luminous-hair-oil"
                        className="inline-flex items-center px-5 py-2.5 bg-[#8daa91] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#7d9a81] transition-colors rounded-sm"
                      >
                        Buy Again — $85
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column — Addresses */}
              <div className="border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-medium text-foreground">Saved Addresses</h2>
                  <button
                    className="w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                    aria-label="Add address"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {ADDRESSES.map((addr) => (
                    <label
                      key={addr.id}
                      className={cn(
                        'flex items-start gap-3 border p-4 cursor-pointer transition-colors',
                        addr.primary ? 'border-foreground' : 'border-border hover:border-foreground/40'
                      )}
                    >
                      <input
                        type="radio"
                        name="address"
                        defaultChecked={addr.primary}
                        className="mt-0.5 accent-[#8daa91]"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-0.5">
                          {addr.type}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {addr.name}<br />
                          {addr.line1}<br />
                          {addr.line2}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
