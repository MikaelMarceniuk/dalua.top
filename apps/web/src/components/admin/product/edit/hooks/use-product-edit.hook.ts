'use client'

import { useState } from 'react'
import { EditProductFormValues } from '../../schemas/edit-product.schema'
import { isExistingImage } from '../utils/is-existing-image.utils'
import { isNewImage } from '../utils/is-new-image.utils'
import { SubmitStep } from '../constants/submit-steps.constants'
import { useUpdateProduct } from '@/components/admin/hooks/use-update-product.hook'
import { useCreateProductImage } from '@/components/admin/hooks/use-create-product-image.hook'
import { useUpdateProductImage } from '@/components/admin/hooks/use-update-product-image.hook'
import { useQueryClient } from '@tanstack/react-query'
import { productKeys } from '@/components/admin/query-keys/product.query-keys'

type useProductEditParams = {
  id?: string
  slug: string
}

export const useProductEdit = ({ id, slug }: useProductEditParams) => {
  const queryClient = useQueryClient()
  const [submitStep, setSubmitStep] = useState<SubmitStep>('idle')
  const { updateProductMutation } = useUpdateProduct({ id })
  const { createProductImageMutation } = useCreateProductImage({ id })
  const { updateProductImageMutation } = useUpdateProductImage({ id })

  const skippedSteps: SubmitStep[] = []

  const updateProduct = async (data: EditProductFormValues) => {
    const { images, ...productData } = data

    const newImages = images.filter(isNewImage)
    const existingImages = images.filter(isExistingImage)

    try {
      setSubmitStep('updatingProduct')
      await updateProductMutation({ data: productData })

      if (existingImages.length > 0) {
        setSubmitStep('updatingExistingPhotos')
        await updateProductImageMutation({ data: existingImages })
      }

      if (newImages.length > 0) {
        setSubmitStep('uploadingNewPhotos')
        await createProductImageMutation({ data: newImages })
      }

      setSubmitStep('refetchingProduct')
      await queryClient.invalidateQueries({
        queryKey: productKeys.findBySlug(slug),
      })

      // toast.success('Produto atualizado com sucesso!')
    } catch (error) {
      // toast.error('Erro ao atualizar produto. Tente novamente.')
    } finally {
      setSubmitStep('idle')
    }
  }

  return {
    submitStep,
    skippedSteps,
    updateProduct,
  }
}
