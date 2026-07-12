'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { ImageUploadField } from './image-upload.field'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { formatCurrency } from '@/lib/utils'
import {
  productFormSchema,
  ProductFormValues,
} from '../schemas/product-form.schema'

interface ProductFormProps {
  mode: 'create' | 'edit'
  defaultValues?: Partial<ProductFormValues> & { imageUrl?: string | null }
  productId?: string
  onSubmit: (values: ProductFormValues) => Promise<void>
}

export const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  defaultValues,
}) => {
  const router = useRouter()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      priceInCents: defaultValues?.priceInCents ?? 0,
      isAvailableForPurchase: defaultValues?.isAvailableForPurchase ?? true,
      image: undefined,
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log('handleSubmit.data: ', data)
  })

  const isSubmitting = form.formState.isSubmitting

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Novo produto' : 'Editar produto'}
          </CardTitle>
          <CardDescription>
            Preencha as informações do produto abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
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
                  placeholder="Nome do produto"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  placeholder="Descreva o produto"
                  className="min-h-30 resize-none"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="priceInCents"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Preço (em centavos)
                  </FieldLabel>
                  <Input
                    type="number"
                    placeholder="Ex: 4990 = R$ 49,90"
                    id={field.name}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const raw = e.target.value
                      field.onChange(raw === '' ? undefined : Number(raw))
                    }}
                  />
                  <FieldDescription>
                    Informe o valor em centavos, sem pontos ou vírgulas. <br />
                    {field.value > 0 && (
                      <span>Valor em reais: {formatCurrency(field.value)}</span>
                    )}
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
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Disponível para compra
                  </FieldLabel>
                  <div className="flex h-9 items-center">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Imagem do produto</FieldLabel>
                <ImageUploadField
                  value={field.value ?? null}
                  onChange={field.onChange}
                  existingImageUrl={defaultValues?.imageUrl}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Salvando...'
            : mode === 'create'
              ? 'Criar produto'
              : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  )
}
