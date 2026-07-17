'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { IntegrationSection } from './components/integration-section'
import { integrationGroupEnum } from './types/integration.type'
import { integrationGroupConfig } from './constants/integration-group.constants'
import { IntegrationSectionSkeleton } from './components/integration-section.skeleton'
import { useIntegration } from './integration-provider'

export const IntegrationContent = () => {
  const { integrations, isPendingIntegrations } = useIntegration()

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Integrações</h1>
        <p className="text-sm text-muted-foreground">
          Conecte serviços externos para processar pagamentos e gerenciar
          envios.
        </p>
      </div>

      {isPendingIntegrations
        ? integrationGroupEnum.map((group, index) => {
            const config = integrationGroupConfig[group]
            return (
              <React.Fragment key={group}>
                {index > 0 && <Separator />}
                <IntegrationSectionSkeleton
                  icon={config.icon}
                  title={config.title}
                  description={config.description}
                />
              </React.Fragment>
            )
          })
        : integrationGroupEnum.map((group, index) => {
            const groupIntegrations = integrations?.[group]
            if (!groupIntegrations?.length) return null

            const config = integrationGroupConfig[group]

            return (
              <React.Fragment key={group}>
                {index > 0 && <Separator />}
                <IntegrationSection
                  icon={config.icon}
                  title={config.title}
                  description={config.description}
                  integrations={groupIntegrations}
                />
              </React.Fragment>
            )
          })}
    </div>
  )
}
