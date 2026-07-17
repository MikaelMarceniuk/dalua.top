'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from '@/components/ui/field'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  connectIntegrationSchema,
  ConnectIntegrationValues,
} from '../schemas/connect-integration.schema'
import { Integration } from '../types/integration.type'
import { IntegrationProviderConfig } from '../constants/integration-provider.constants'
import { useConnectIntegration } from '../hooks/use-connect-integration.hook'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { integrationKeys } from '@/components/admin/query-keys/integration.query-keys'

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
  const { mutateAsync, isPending } = useConnectIntegration()

  const form = useForm<ConnectIntegrationValues>({
    resolver: zodResolver(connectIntegrationSchema),
    defaultValues: {
      accessToken: '',
      publicKey: '',
    },
  })

  if (!integration) {
    return null
  }

  const { name } = IntegrationProviderConfig[integration.provider]

  const submitHandler = form.handleSubmit(async (data) => {
    await mutateAsync(
      { data, provider: integration.provider },
      {
        onSuccess: () => {
          toast.success('Conexão bem-sucedida!')
          openHandler(false)
          form.reset()
        },
        onError: () => {
          toast.error(
            'Erro na conexão. Verifique as credenciais e tente novamente.'
          )
        },
      }
    )
  })

  return (
    <Dialog open={isOpen} onOpenChange={openHandler}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar {name}</DialogTitle>
          <DialogDescription>
            Insira suas credenciais de produção, disponíveis no painel de
            desenvolvedores do {name}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <Controller
            name="accessToken"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Access Token</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  autoComplete="off"
                  disabled={isPending}
                />
                <FieldDescription>
                  Chave secreta usada para autenticação.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="publicKey"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Public Key</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => openHandler(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Validando...' : 'Conectar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
