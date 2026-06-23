import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Ingredients', href: '/ingredients' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Terms', href: '/terms' },
  { label: 'Newsletter', href: '/newsletter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <span className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground">
          Lumina
        </span>
        <nav className="flex flex-wrap gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.05em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground tracking-wide">
          &copy; 2024 Lumina. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export function CheckoutFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm font-semibold tracking-[0.15em] uppercase text-foreground">
          LUMINA
        </span>
        <div className="flex gap-6">
          {['Sustainability', 'Shipping & Returns', 'Privacy Policy', 'Contact'].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground tracking-wide">
          &copy; 2024 LUMINA ARTISANAL HAIRCARE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
