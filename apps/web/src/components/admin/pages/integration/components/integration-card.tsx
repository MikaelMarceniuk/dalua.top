'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Integration } from '../types/integration.type'
import { Badge } from '@/components/ui/badge'
import { IconCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

type IntegrationCardProps = {
  integration: Integration
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-background">
            <img
              src={integration.logo}
              alt={integration.name}
              className="size-6 object-contain"
            />
          </div>
          <CardTitle className="text-sm">{integration.name}</CardTitle>
        </div>
        {integration.isConnected && (
          <Badge variant="secondary" className="gap-1">
            <IconCheck className="size-3" />
            Conectado
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription>{integration.description}</CardDescription>
        <Button
          variant={integration.isConnected ? 'outline' : 'default'}
          size="sm"
          className="w-fit"
        >
          {integration.isConnected ? 'Gerenciar' : 'Conectar'}
        </Button>
      </CardContent>
    </Card>
  )
}
