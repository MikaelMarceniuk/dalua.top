'use client'

import z from 'zod'
import { useConnectIntegration } from '../hooks/use-connect-integration.hook'
import { IntegrationField } from '../types/integration-field.type'
import { Integration } from '../types/integration.type'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type ConnectFormProps = {
  integration: Integration
  fields: IntegrationField[]
  onClose: () => void
}

export const ConnectForm: React.FC<ConnectFormProps> = ({
  integration,
  fields,
  onClose,
}) => {
  const { connectIntegration, isConnecting } = useConnectIntegration()

  const dynamicSchema = z.object(
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        field.isRequired
          ? z.string().min(1, `${field.label} é obrigatório`)
          : z.string().optional(),
      ])
    )
  )

  const form = useForm({
    resolver: zodResolver(dynamicSchema),
    defaultValues: Object.fromEntries(fields.map((f) => [f.key, ''])),
  })

  const submitHandler = form.handleSubmit(async (data) => {
    await connectIntegration(
      { provider: integration.provider, data },
      {
        onSuccess: () => {
          toast.success(`Conexão com ${integration.provider} bem-sucedida!`)
          onClose()
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
    <form onSubmit={submitHandler} className="flex flex-col gap-4">
      {fields.map((field) => (
        <Controller
          key={field.key}
          name={field.key}
          control={form.control}
          render={({ field: rhfField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.key}>{field.label}</FieldLabel>
              <Input
                {...rhfField}
                id={field.key}
                type={field.isSecret ? 'password' : 'text'}
                placeholder={field.placeholder ?? ''}
                autoComplete="off"
                disabled={isConnecting}
              />
              {field.description && (
                <FieldDescription>{field.description}</FieldDescription>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}

      <DialogFooter className="mt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isConnecting}>
          {isConnecting ? 'Conectando...' : 'Conectar'}
        </Button>
      </DialogFooter>
    </form>
  )
}
