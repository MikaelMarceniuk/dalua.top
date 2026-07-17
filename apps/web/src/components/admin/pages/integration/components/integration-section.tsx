'use client'

import { Integration } from '../types/integration.type'
import { IntegrationCard } from './integration-card'

interface IntegrationSectionProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  integrations: Integration[]
}

export const IntegrationSection: React.FC<IntegrationSectionProps> = ({
  icon: Icon,
  title,
  description,
  integrations,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4.5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <IntegrationCard key={integration.id} integration={integration} />
        ))}
      </div>
    </section>
  )
}
