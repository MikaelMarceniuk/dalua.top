'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useEffect } from 'react'
import {
  CreateProductFormValues,
  createProductSchema,
} from '../schemas/create-product.schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCreateProduct } from '@/components/admin/pages/product/hooks/use-create-product.hook'
import { toast } from 'sonner'

type CreateProductDialogProps = {
  isOpen: boolean
  handleOpen: (isOpen: boolean) => void
}

export const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  isOpen,
  handleOpen,
}) => {
  const { mutateAsync, isPending } = useCreateProduct()

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      priceInCents: undefined,
    },
  })

  const handleSubmit = form.handleSubmit(
    async ({ name, description, priceInCents }) => {
      await mutateAsync(
        {
          data: {
            name,
            description,
            priceInCents,
            isAvailableForPurchase: false,
          },
        },
        {
          onSuccess: () => {
            toast.success(`Produto "${name}" criado com sucesso!`)
            form.reset()
          },
        }
      )
    }
  )

  useEffect(() => {
    if (isOpen) return
    form.reset()
  }, [isOpen, form])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar novo produto</DialogTitle>
          <DialogDescription>
            Preencha as informações básicas do produto. Você poderá adicionar
            variações e imagens depois.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  autoComplete="off"
                  autoFocus
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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
                    placeholder="49,90"
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
                    disabled={isPending}
                  />
                </div>
                <FieldDescription>
                  {field.value > 0
                    ? `Será salvo como ${formatCurrency(field.value)} (${field.value} centavos)`
                    : 'Digite o valor em centavos, ex: 4990 = R$ 49,90'}
                </FieldDescription>
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
                  {...field}
                  id={field.name}
                  placeholder="Descreva os principais detalhes do produto"
                  className="min-h-24 resize-none"
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
              onClick={() => handleOpen(false)}
              disabled={form.formState.isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Criando...' : 'Criar produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
