'use client'

import { ProductFormValues } from '@/components/admin/product/schemas/product-form.schema'
import { productKeys } from '@/components/admin/query-keys/product.query-keys'
import { api } from '@/lib/axios.lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductDetails } from '../types/product-details.type'
import { AxiosError } from 'axios'

type useUpdateProductHookParams = {
  id?: string
}

type useUpdateProductMutateParams = {
  data: ProductFormValues
}

export const useUpdateProduct = ({ id }: useUpdateProductHookParams) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: productKeys.update(id),
    mutationFn: async ({ data }: useUpdateProductMutateParams) => {
      if (!id) {
        throw new Error('Product id is required')
      }

      return await api.put<ProductDetails>(`/product/${id}`, {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        isAvailableForPurchase: data.isAvailableForPurchase,
      })
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData<ProductDetails>(
        productKeys.findBySlug(data.slug),
        () => ({ ...data })
      )
      queryClient.invalidateQueries({ queryKey: productKeys.find })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log('useUpdateProduct.error: ', error.code)
      }
    },
  })

  return {
    updateProductMutation: mutateAsync,
    isPending,
  }
}
