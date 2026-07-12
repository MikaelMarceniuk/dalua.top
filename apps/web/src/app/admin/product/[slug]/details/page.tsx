import { AppHeader } from '@/components/admin/ui/app-header'
import { InConstruction } from '@/components/admin/ui/in-construction'

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
      <InConstruction
        title="Detalhes do produto"
        description="A tela de detalhes do produto está em desenvolvimento."
      />
    </main>
  )
}

export default ProductDetailsPage
