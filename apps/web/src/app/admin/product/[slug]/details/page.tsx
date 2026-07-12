import { AppHeader } from '@/components/admin/ui/app-header'

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string
  }>
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const { slug } = await params

  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Product', href: '/admin/product' },
          { label: slug, href: `/admin/product/${slug}/details` },
          { label: 'Details' },
        ]}
      />
    </main>
  )
}

export default ProductDetailsPage
