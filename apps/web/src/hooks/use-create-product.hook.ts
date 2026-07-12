'use client'

import { ProductFormValues } from '@/components/admin/product/schemas/product-form.schema'
import { productKeys } from '@/components/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { Product } from '@/types/product.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type useCreateProductParams = {
  data: ProductFormValues
}

type ApiResult = {
  product: {
    id: string
    name: string
    description: string
    priceInCents: number
    isAvailableForPurchase: boolean
  }
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: productKeys.create,
    mutationFn: async ({ data }: useCreateProductParams) => {
      const apiResult = await api.post<ApiResult>(`/product`, { ...data })
      return apiResult.data.product
    },
    onSuccess: () => {
      queryClient.setQueryData<Product[]>(productKeys.find, (old) => {})
    },
  })
}
