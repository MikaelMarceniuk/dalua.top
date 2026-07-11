import { findProductsAction } from '@/components/actions/product/find-products.action'
import { ProductContent } from '@/components/admin/product/content'
import { AppHeader } from '@/components/admin/ui/app-header'

const ProductPage = async () => {
  const products = await findProductsAction()

  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Product', href: '/product' },
          { label: 'View' },
        ]}
      />
      <ProductContent products={products} />
    </main>
  )
}

export default ProductPage
