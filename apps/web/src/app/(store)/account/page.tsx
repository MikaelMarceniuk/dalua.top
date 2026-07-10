'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  IconClipboardList,
  IconCreditCard,
  IconDashboard,
  IconMapPin,
  IconPlus,
  IconSettings,
} from '@tabler/icons-react'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: IconDashboard },
  { id: 'orders', label: 'Order History', icon: IconClipboardList },
  { id: 'addresses', label: 'Addresses', icon: IconMapPin },
  { id: 'payment', label: 'Payment Methods', icon: IconCreditCard },
  { id: 'settings', label: 'Settings', icon: IconSettings },
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
      <div className="mx-auto max-w-300 px-0 py-0 md:px-6 md:py-10">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full border-b border-border md:w-56 md:shrink-0 md:border-r md:border-b-0">
            <div className="px-6 py-8 md:py-10">
              <p className="text-sm font-semibold text-foreground">
                My Account
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Manage your wellness rituals
              </p>
            </div>
            <nav className="pb-8">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveNav(id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-6 py-3 text-left text-sm transition-colors',
                    activeNav === id
                      ? 'border-l-2 border-foreground bg-secondary/40 font-medium text-foreground'
                      : 'border-l-2 text-muted-foreground hover:bg-secondary/20 hover:text-foreground'
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
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
              Welcome back, Sarah.
            </h1>
            <p className="mb-10 text-sm text-muted-foreground">
              Here is a summary of your recent activity and saved preferences.
            </p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
              {/* Left column */}
              <div className="flex flex-col gap-6">
                {/* Recent Order Card */}
                <div className="border border-border p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-base font-medium text-foreground">
                      Recent Order
                    </h2>
                    <span className="text-xs tracking-wide text-muted-foreground">
                      #LUM-8492
                    </span>
                  </div>

                  {/* Order tracker */}
                  <div className="relative mb-6 flex items-center justify-between">
                    {/* Progress line */}
                    <div className="absolute top-3 right-0 left-0 h-px bg-border" />
                    <div
                      className="absolute top-3 left-0 h-px bg-[#8daa91] transition-all"
                      style={{ width: '35%' }}
                    />
                    {ORDER_STEPS.map((step) => (
                      <div
                        key={step.label}
                        className="relative z-10 flex flex-col items-center gap-2"
                      >
                        <div
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background',
                            step.done
                              ? 'border-[#8daa91] bg-[#8daa91]'
                              : 'border-border'
                          )}
                        >
                          {step.done && (
                            <div className="h-2 w-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="text-center text-[10px] leading-tight tracking-wide text-muted-foreground">
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
                    Estimated delivery: Tomorrow, by 8:00 PM
                  </p>
                </div>

                {/* Replenish card */}
                <div className="border border-border p-6">
                  <div className="flex items-start gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#8daa91]/10">
                      <Image
                        src="/images/luminous-hair-oil.png"
                        alt="Luminous Hair Oil"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="mb-2 inline-block border border-border px-2 py-0.5 text-[10px] tracking-widest text-muted-foreground uppercase">
                        Replenish
                      </span>
                      <h3 className="mb-1 text-base font-medium text-foreground">
                        Luminous Hair Oil
                      </h3>
                      <p className="mb-4 text-xs text-muted-foreground">
                        Your daily ritual for deep hydration and shine.
                      </p>
                      <Link
                        href="/products/luminous-hair-oil"
                        className="inline-flex items-center rounded-sm bg-[#8daa91] px-5 py-2.5 text-xs tracking-widest text-white uppercase transition-colors hover:bg-[#7d9a81]"
                      >
                        Buy Again — $85
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column — Addresses */}
              <div className="border border-border p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-base font-medium text-foreground">
                    Saved Addresses
                  </h2>
                  <button
                    className="flex h-7 w-7 items-center justify-center border border-border transition-colors hover:bg-secondary"
                    aria-label="Add address"
                  >
                    <IconPlus size={14} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {ADDRESSES.map((addr) => (
                    <label
                      key={addr.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 border p-4 transition-colors',
                        addr.primary
                          ? 'border-foreground'
                          : 'border-border hover:border-foreground/40'
                      )}
                    >
                      <input
                        type="radio"
                        name="address"
                        defaultChecked={addr.primary}
                        className="mt-0.5 accent-[#8daa91]"
                      />
                      <div>
                        <p className="mb-0.5 text-sm font-medium text-foreground">
                          {addr.type}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {addr.name}
                          <br />
                          {addr.line1}
                          <br />
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
