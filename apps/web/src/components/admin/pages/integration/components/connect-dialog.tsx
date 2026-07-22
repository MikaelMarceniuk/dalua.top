'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Integration } from '../types/integration.type'
import { IntegrationProviderConfig } from '../constants/integration-provider.constants'
import { useFindIntegrationFields } from '../hooks/use-find-integration-fields.hook'
import { Skeleton } from '@/components/ui/skeleton'
import { ConnectForm } from './connect-form'

type ConnectDialogProps = {
  isOpen: boolean
  openHandler: (isOpen: boolean) => void
  integration?: Integration
}

export const ConnectDialog: React.FC<ConnectDialogProps> = ({
  isOpen,
  openHandler,
  integration,
}) => {
  const { fields, isPendingFields } = useFindIntegrationFields({
    provider: integration?.provider,
  })

  if (!integration) {
    return null
  }

  const { name } = IntegrationProviderConfig[integration.provider]

  return (
    <Dialog open={isOpen} onOpenChange={openHandler}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar {name}</DialogTitle>
        </DialogHeader>

        {isPendingFields || fields.length === 0 ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <ConnectForm
            integration={integration}
            fields={fields}
            onClose={() => openHandler(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
