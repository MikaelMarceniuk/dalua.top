import { StoreProvider } from '@/lib/store'
import { StorefrontNav } from '@/components/nav'
import Footer from '@/components/footer'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <StorefrontNav />
      <main>{children}</main>
      <Footer />
    </StoreProvider>
  )
}
