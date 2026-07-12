'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  editProductFormSchema,
  EditProductFormValues,
} from '../schemas/edit-product.schema'
import { ProductFormNav } from './nav'
import { BasicInfoForm } from './forms/basic-info.form'
import { ImagesForm } from './forms/images.form'
import { VariantsForm } from './forms/variants.form'
import { ContentForm } from './forms/content.form'
import { useFindProductBySlug } from '@/hooks/use-find-product-by-slug.hook'
import { EditProductPageSkeleton } from './content.skeleton'
import { useEffect } from 'react'

interface EditProductPageContentProps {
  slug: string
  defaultValues?: Partial<EditProductFormValues>
}

export const EditProductPageContent = ({
  slug,
  defaultValues,
}: EditProductPageContentProps) => {
  const { product, isPending } = useFindProductBySlug({ slug })

  const form = useForm({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: '',
      description: '',
      priceInCents: 0,
      isAvailableForPurchase: true,
      images: [],
      variantTypes: [],
      contentBlocks: [],
      ...defaultValues,
    },
  })

  const submitHandler = form.handleSubmit((data) => {
    console.log('EditProductPageContent.data: ', data)
  })

  useEffect(() => {
    if (!product) return

    form.reset({
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      isAvailableForPurchase: product.isAvailableForPurchase,
      images: [], // ainda não mapeado
      variantTypes: [], // ainda não mapeado
      contentBlocks: [], // ainda não mapeado
    })
  }, [product, form])

  if (isPending) {
    return <EditProductPageSkeleton />
  }

  return (
    <main className="p-4 lg:p-6">
      <FormProvider {...form}>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]"
        >
          <ProductFormNav />

          <div className="flex flex-col gap-6">
            <BasicInfoForm />
            <ImagesForm />
            <VariantsForm />
            <ContentForm />

            <div className="sticky bottom-0 -mx-4 flex justify-end gap-2 border-t bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
              >
                Descartar alterações
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Salvando...' : 'Salvar produto'}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
