import { api } from '@/lib/axios.lib'
import { Product } from '@/types/product.type'

type ApiResponse = { products: Product[] }

export const findProductsAction = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse>('/product')
  return data.products
}
