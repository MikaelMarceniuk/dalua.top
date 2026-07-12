'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui/field'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { EditProductFormValues } from '../../schemas/edit-product.schema'
import { formatCurrency } from '@/lib/utils'

export const BasicInfoForm = () => {
  const form = useFormContext<EditProductFormValues>()

  return (
    <Card id="basic-info" className="scroll-mt-20">
      <CardHeader>
        <CardTitle>Informações básicas</CardTitle>
        <CardDescription>
          Nome, descrição e preço que aparecem para o cliente.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ex: Shampoo restaurador"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Descreva os principais detalhes do produto"
                className="min-h-32 resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            name="priceInCents"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Preço</FieldLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
                    R$
                  </span>
                  <Input
                    type="number"
                    id={field.name}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value
                      field.onChange(raw === '' ? undefined : Number(raw))
                    }}
                    className="pl-9"
                    placeholder="4990"
                  />
                </div>
                <FieldDescription>
                  {field.value > 0
                    ? `Equivale a ${formatCurrency(field.value)}`
                    : 'Valor em centavos (ex: 4990 = R$ 49,90)'}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="isAvailableForPurchase"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Disponível para compra
                </FieldLabel>
                <div className="flex h-9 items-center">
                  <Switch
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
                <FieldDescription>
                  Produtos indisponíveis não aparecem na loja.
                </FieldDescription>
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}
