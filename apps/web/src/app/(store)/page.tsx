import { CatalogSection } from '@/components/store/pages/home/catalog.section'
import { HeroSection } from '@/components/store/pages/home/hero.section'

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CatalogSection />
    </main>
  )
}

export default HomePage
