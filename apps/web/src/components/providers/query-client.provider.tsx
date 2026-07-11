'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { withChildren } from '@/types/with-children.type'

const queryClient = new QueryClient()

export const AppQueryClientProvider: React.FC<withChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
