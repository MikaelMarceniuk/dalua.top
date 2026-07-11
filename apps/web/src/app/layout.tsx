import { Geist_Mono, Inter } from 'next/font/google'

import './globals.css'
import { cn } from '@/lib/utils'
import { AppQueryClientProvider } from '@/components/providers/query-client.provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <AppQueryClientProvider>
        <body>{children}</body>
      </AppQueryClientProvider>
      <Toaster />
    </html>
  )
}
