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
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <span className="text-sm font-semibold tracking-[0.15em] text-foreground uppercase">
          Lumina
        </span>
        <nav className="flex flex-wrap gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.05em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs tracking-wide text-muted-foreground">
          &copy; 2024 Lumina. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export function CheckoutFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <span className="text-sm font-semibold tracking-[0.15em] text-foreground uppercase">
          LUMINA
        </span>
        <div className="flex gap-6">
          {[
            'Sustainability',
            'Shipping & Returns',
            'Privacy Policy',
            'Contact',
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-xs tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </Link>
          ))}
        </div>
        <p className="text-xs tracking-wide text-muted-foreground">
          &copy; 2024 LUMINA ARTISANAL HAIRCARE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
