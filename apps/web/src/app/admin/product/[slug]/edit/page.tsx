import { AppHeader } from '@/components/admin/ui/app-header'

type EditProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

const EditProductPage: React.FC<EditProductPageProps> = async ({ params }) => {
  const { slug } = await params

  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Product', href: '/admin/product' },
          { label: slug, href: `/admin/product/${slug}/details` },
          { label: 'Edit' },
        ]}
      />
    </main>
  )
}

export default EditProductPage
