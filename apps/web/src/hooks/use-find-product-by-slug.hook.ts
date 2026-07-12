'use client'

import { productKeys } from '@/components/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { ProductDetails } from '@/types/product-details.type'
import { useQuery } from '@tanstack/react-query'

type useFindProductBySlugParams = {
  slug: string
}

export const useFindProductBySlug = ({ slug }: useFindProductBySlugParams) => {
  const { data, isPending } = useQuery<ProductDetails>({
    queryKey: productKeys.findBySlug(slug),
    queryFn: async () => {
      const { data } = await api.get<ProductDetails>(`/product/${slug}`)
      return data
    },
  })

  return {
    product: data ?? undefined,
    isPending,
  }
}
