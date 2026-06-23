'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, User } from 'lucide-react'
import { useStore } from '@/lib/store'

const NAV_LINKS = [
  { label: 'Atelier', href: '/' },
  { label: 'Collections', href: '/collections' },
]

const NAV_RIGHT = [
  { label: 'Journal', href: '/journal' },
  { label: 'Account', href: '/account' },
]

export default function Nav() {
  const { cartCount } = useStore()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
        {/* Left links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.1em] text-foreground/70 uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold tracking-[0.2em] text-foreground uppercase"
        >
          Lumina
        </Link>

        {/* Right links + icons */}
        <nav className="flex items-center gap-6">
          {NAV_RIGHT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden text-xs tracking-[0.1em] text-foreground/70 uppercase transition-colors hover:text-foreground sm:block"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            aria-label="Account"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href="/checkout"
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-foreground/70 transition-colors hover:text-foreground"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8daa91] text-[10px] leading-none font-medium text-white">
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
  const isCheckout = pathname === '/checkout'

  if (isCheckout) {
    return (
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-center px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase"
          >
            LUMINA
          </Link>
        </div>
      </header>
    )
  }

  return <Nav />
}
