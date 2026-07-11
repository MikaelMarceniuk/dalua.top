'use client'

import { AppHeader } from '@/components/admin/ui/app-header'
import { ProductForm } from '@/components/admin/product/new/product.form'
import { useCreateProduct } from '@/hooks/use-create-product.hook'
import { ProductFormValues } from '@/components/admin/product/new/product-form.schema'

const NewProductPage = () => {
  const { mutateAsync: createProduct } = useCreateProduct()

  async function handleSubmit(values: ProductFormValues) {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('priceInCents', String(values.priceInCents))
    formData.append(
      'isAvailableForPurchase',
      String(values.isAvailableForPurchase)
    )
    if (values.image) formData.append('image', values.image)

    await createProduct({
      data: {
        name: values.name,
        description: values.description,
        priceInCents: values.priceInCents,
        isAvailableForPurchase: values.isAvailableForPurchase,
      },
    })
  }

  return (
    <main>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Produtos', href: '/admin/product' },
          { label: 'Novo' },
        ]}
      />
      <div className="p-4 lg:p-6">
        <ProductForm mode="create" onSubmit={handleSubmit} />
      </div>
    </main>
  )
}

export default NewProductPage
