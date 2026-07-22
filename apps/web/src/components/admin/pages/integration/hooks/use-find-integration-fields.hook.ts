'use client'

import { integrationKeys } from '@/components/admin/query-keys/integration.query-keys'
import { api } from '@/lib/axios.lib'
import { useQuery } from '@tanstack/react-query'
import { IntegrationField } from '../types/integration-field.type'

type useFindIntegrationFieldsParams = {
  provider?: string
}

type useFindIntegrationFieldsResponse = {
  fields: IntegrationField[]
}

type ApiResponse = {
  fields: IntegrationField[]
}

// TODO Improve this hook, because its fetching a lot
export const useFindIntegrationFields = ({
  provider,
}: useFindIntegrationFieldsParams) => {
  const { data, isPending } = useQuery<useFindIntegrationFieldsResponse>({
    queryKey: integrationKeys.findFields(provider),
    queryFn: async () => {
      return (await api.get<ApiResponse>(`/integration/${provider}/fields`))
        .data
    },
    enabled: !!provider,
  })

  return {
    fields: data?.fields || [],
    isPendingFields: isPending,
  }
}
