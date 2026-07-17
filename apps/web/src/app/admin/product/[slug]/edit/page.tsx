import { EditProductPageContent } from '@/components/admin/pages/product/edit/content'
import { AppHeader } from '@/components/admin/ui/app-header'

type EditProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

const EditProductPage: React.FC<EditProductPageProps> = async ({ params }) => {
  const { slug } = await params

  return (
    <div>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Product', href: '/admin/product' },
          { label: slug, href: `/admin/product/${slug}/details` },
          { label: 'Edit' },
        ]}
      />
      <EditProductPageContent slug={slug} />
    </div>
  )
}

export default EditProductPage
