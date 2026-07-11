import { api } from '@/lib/axios.lib'

type deleteProductActionParams = {
  id: string
}

export const deleteProductAction = async ({
  id,
}: deleteProductActionParams): Promise<void> => {
  await api.delete(`/product/${id}`)
}
