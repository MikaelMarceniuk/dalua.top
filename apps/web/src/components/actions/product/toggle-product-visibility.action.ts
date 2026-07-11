import { api } from '@/lib/axios.lib'

type toggleProductVisibilityActionParams = {
  id: string
}

export const toggleProductVisibilityAction = async ({
  id,
}: toggleProductVisibilityActionParams): Promise<void> => {
  await api.put(`/product/${id}`)
}
