'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Integration } from '../types/integration.type'
import { Badge } from '@/components/ui/badge'
import { IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { IntegrationProviderConfig } from '../constants/integration-provider.constants'
import Image from 'next/image'
import { useIntegration } from '../integration-provider'

type IntegrationCardProps = {
  integration: Integration
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
}) => {
  const { openConnectDialogHandler } = useIntegration()
  const { name, image } = IntegrationProviderConfig[integration.provider]

  const handleOnClick = () => {
    if (integration.isConnected) {
      console.log('Integration is connected.')
      return
    }
    openConnectDialogHandler(integration)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-28 shrink-0 items-center justify-center rounded-md border bg-background">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-1.5"
              unoptimized
            />
          </div>
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
        </div>

        {integration.isConnected && (
          <Badge variant="secondary" className="shrink-0 gap-1">
            <IconCheck className="size-3" />
            Conectado
          </Badge>
        )}

        <Button
          variant={integration.isConnected ? 'outline' : 'default'}
          size="sm"
          className="w-fit"
          onClick={handleOnClick}
        >
          {integration.isConnected ? 'Gerenciar' : 'Conectar'}
        </Button>
      </CardHeader>
    </Card>
  )
}
