'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, User } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Atelier', href: '/' },
  { label: 'Collections', href: '/collections' },
]

const NAV_RIGHT = [
  { label: 'Journal', href: '/journal' },
  { label: 'Account', href: '/account' },
]

export default function Nav() {
  const pathname = usePathname()
  const { cartCount } = useStore()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.2em] uppercase text-foreground"
        >
          Lumina
        </Link>

        {/* Right links + icons */}
        <nav className="flex items-center gap-6">
          {NAV_RIGHT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.1em] uppercase text-foreground/70 hover:text-foreground transition-colors hidden sm:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            aria-label="Account"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            <User
              size={18}
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/checkout"
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-foreground/70 hover:text-foreground transition-colors"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8daa91] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none font-medium">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function StorefrontNav() {
  const pathname = usePathname()
  const { cartCount } = useStore()
  const isCheckout = pathname === '/checkout'

  if (isCheckout) {
    return (
      <header className="border-b border-border bg-background">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-center">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground"
          >
            LUMINA
          </Link>
        </div>
      </header>
    )
  }

  return <Nav />
}
