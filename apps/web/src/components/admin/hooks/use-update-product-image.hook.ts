'use client'

import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ExistingProductImage } from '../pages/product/schemas/product-image.schema'
import { api } from '@/lib/axios.lib'

type useUpdateProductImageHookParams = {
  id?: string
}

type useUpdateProductImageMutateParams = {
  data: ExistingProductImage[]
}

export const useUpdateProductImage = ({
  id,
}: useUpdateProductImageHookParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: productKeys.updateImage(id),
    mutationFn: async ({ data }: useUpdateProductImageMutateParams) => {
      if (!id) {
        throw new Error('Product id is required')
      }
      await api.patch(`/product/${id}/image`, { images: [...data] })
    },
  })

  return {
    updateProductImageMutation: mutateAsync,
    isPending,
  }
}
