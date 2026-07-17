'use client'

import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { Product } from '@/components/admin/types/product.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type useUpdateProductAvailabilityParams = {
  id: string
}

export const useUpdateProductAvailability = ({
  id,
}: useUpdateProductAvailabilityParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: productKeys.updateAvailability(id),
    mutationFn: async () => {
      await api.put(`/product/availability/${id}`)
    },
    onSuccess: () => {
      queryClient.setQueryData<Product[]>(productKeys.find, (old) =>
        old?.map((product) =>
          product.id == id
            ? {
                ...product,
                isAvailableForPurchase: !product.isAvailableForPurchase,
              }
            : { ...product }
        )
      )
    },
  })
}
