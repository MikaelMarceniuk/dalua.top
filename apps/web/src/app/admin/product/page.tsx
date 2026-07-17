import { ProductContent } from '@/components/admin/pages/product/content'
import { AppHeader } from '@/components/admin/ui/app-header'

const ProductPage = () => {
  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Product', href: '/admin/product' },
          { label: 'View' },
        ]}
      />
      <ProductContent />
    </main>
  )
}

export default ProductPage
