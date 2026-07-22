'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios.lib'
import { Integration, IntegrationProvider } from '../types/integration.type'
import { integrationKeys } from '@/components/admin/query-keys/integration.query-keys'

type MutationParams = {
  provider: IntegrationProvider
  data: Record<string, string | undefined>
}

export const useConnectIntegration = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ data, provider }: MutationParams) =>
      await api.post(`/integration/${provider}/connect`, {
        credentials: { ...data },
      }),
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

  return {
    connectIntegration: mutateAsync,
    isConnecting: isPending,
  }
}
