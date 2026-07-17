'use client'

import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewProductImage } from '../product/schemas/product-image.schema'
import { api } from '@/lib/axios.lib'

type useCreateProductImageHookParams = {
  id?: string
}

type useCreateProductImageMutateParams = {
  data: NewProductImage[]
}

export const useCreateProductImage = ({
  id,
}: useCreateProductImageHookParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: productKeys.updateImage(id),
    mutationFn: async ({ data }: useCreateProductImageMutateParams) => {
      if (!id) {
        throw new Error('Product id is required')
      }

      const formData = new FormData()
      data.forEach((img) => {
        formData.append('images', img.file)
        formData.append('isHighlighted', String(img.isHighlighted))
      })

      const { data: response } = await api.post(
        `/product/${id}/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      return response
    },
  })

  return {
    createProductImageMutation: mutateAsync,
    isPending,
  }
}
