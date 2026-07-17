'use client'

import { withChildren } from '@/types/with-children.type'
import { createContext, useContext, useState } from 'react'
import { useFindIntegration } from './hooks/use-find-integrations.hook'
import { Integration, IntegrationGroup } from './types/integration.type'
import { ConnectDialog } from './components/connect-dialog'

type IntegrationContext = {
  integrations: Record<IntegrationGroup, Integration[]> | undefined
  isPendingIntegrations: boolean
  openConnectDialogHandler: (integration: Integration) => void
}

const IntegrationContext = createContext<IntegrationContext>(
  {} as IntegrationContext
)

export const IntegrationProvider: React.FC<withChildren> = ({ children }) => {
  const [isConnectDialogOpen, setConnectDialogOpen] = useState(false)
  const [currentIntegration, setCurrentIntegration] = useState<
    Integration | undefined
  >(undefined)
  const { integrations, isPending: isPendingIntegrations } =
    useFindIntegration()

  const handleOpenConnectDialog = (integration: Integration) => {
    setCurrentIntegration(integration)
    setConnectDialogOpen(true)
  }

  return (
    <IntegrationContext.Provider
      value={{
        integrations,
        isPendingIntegrations,
        openConnectDialogHandler: handleOpenConnectDialog,
      }}
    >
      {children}
      <ConnectDialog
        isOpen={isConnectDialogOpen}
        openHandler={setConnectDialogOpen}
        integration={currentIntegration}
      />
    </IntegrationContext.Provider>
  )
}

export const useIntegration = () => {
  const ctx = useContext(IntegrationContext)
  if (!ctx) {
    throw new Error('useIntegration must be used within an IntegrationProvider')
  }
  return ctx
}
