'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ConnectIntegrationValues } from '../schemas/connect-integration.schema'
import { api } from '@/lib/axios.lib'
import { Integration, IntegrationProvider } from '../types/integration.type'
import { integrationKeys } from '@/components/admin/query-keys/integration.query-keys'

type MutationParams = {
  provider: IntegrationProvider
  data: ConnectIntegrationValues
}

export const useConnectIntegration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ data, provider }: MutationParams) =>
      await api.post(`/integration/${provider}/connect`, { ...data }),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<Integration[]>(integrationKeys.find, (old) =>
        old?.map((int) =>
          int.provider == variables.provider
            ? { ...int, isConnected: true }
            : { ...int }
        )
      )
    },
  })
}
