import { integrationKeys } from '@/components/admin/query-keys/integration.query-keys'
import { api } from '@/lib/axios.lib'
import { useQuery } from '@tanstack/react-query'
import { Integration, IntegrationGroup } from '../types/integration.type'

type ApiResponse = {
  integrations: Integration[]
}

export const useFindIntegration = () => {
  const { data, isPending } = useQuery<Integration[]>({
    queryKey: integrationKeys.find,
    queryFn: async () =>
      (await api.get<ApiResponse>('/integration')).data.integrations,
  })

  const groupedIntegrations = data?.reduce(
    (acc, int) => {
      acc[int.group] ??= []
      acc[int.group].push(int)
      return acc
    },
    {} as Record<IntegrationGroup, Integration[]>
  )

  return {
    integrations: groupedIntegrations,
    isPending,
  }
}
