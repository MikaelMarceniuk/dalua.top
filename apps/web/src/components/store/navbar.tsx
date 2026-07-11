'use client'

import Link from 'next/link'
import { IconShoppingBag, IconUser } from '@tabler/icons-react'
import { useStore } from '../providers/store.provider'

export const Navbar = () => {
  const { cartCount } = useStore()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-foreground uppercase"
        >
          dalua.top
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/account"
            aria-label="Account"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <IconUser size={18} strokeWidth={1.5} />
          </Link>
          <Link
            href="/checkout"
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-foreground/70 transition-colors hover:text-foreground"
          >
            <IconShoppingBag size={18} strokeWidth={1.5} />
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
