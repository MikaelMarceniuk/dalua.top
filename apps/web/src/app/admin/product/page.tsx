import { ProductContent } from '@/components/admin/product/content'
import { AppHeader } from '@/components/admin/ui/app-header'

const ProductPage = () => {
  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Product', href: '/product' },
          { label: 'View' },
        ]}
      />
      <ProductContent />
    </main>
  )
}

export default ProductPage
