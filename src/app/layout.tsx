import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Lumina — Artisanal Haircare',
  description: 'Clean formulas for effortless, radiant hair. Lumina Artisanal Haircare — Your Ritual, Redefined.',
  keywords: ['haircare', 'artisanal', 'botanical', 'luxury', 'clean beauty'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased text-foreground bg-background">
        {children}
      </body>
    </html>
  )
}
