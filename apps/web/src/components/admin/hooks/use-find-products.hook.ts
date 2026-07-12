'use client'

import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { Product } from '@/components/admin/types/product.type'
import { useQuery } from '@tanstack/react-query'

type ApiResponse = { products: Product[] }

export const useFindProducts = () => {
  const { data, isPending } = useQuery<Product[]>({
    queryKey: productKeys.find,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse>('/product')
      return data.products
    },
  })

  return {
    products: data ?? [],
    isPending,
  }
}
