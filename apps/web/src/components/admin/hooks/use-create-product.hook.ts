'use client'

import { ProductFormValues } from '@/components/admin/pages/product/schemas/product-form.schema'
import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
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
      queryClient.invalidateQueries({ queryKey: productKeys.find })
    },
  })
}
