'use client'

import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { Product } from '@/components/admin/types/product.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type useDeleteProductParams = {
  id: string
}

export const useDeleteProduct = ({ id }: useDeleteProductParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: productKeys.delete(id),
    mutationFn: async () => {
      await api.delete(`/product/${id}`)
    },
    onSuccess: () => {
      queryClient.setQueryData<Product[]>(
        productKeys.find,
        (old) => old?.filter((product) => product.id !== id) ?? []
      )
    },
  })
}
