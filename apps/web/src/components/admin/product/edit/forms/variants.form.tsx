'use client'

import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { EditProductFormValues } from '../../schemas/edit-product.schema'

export const VariantsForm = () => {
  const form = useFormContext<EditProductFormValues>()
  const {
    fields: variantTypes,
    append: appendVariantType,
    remove: removeVariantType,
  } = useFieldArray({ control: form.control, name: 'variantTypes' })

  return (
    <Card id="variants" className="scroll-mt-20">
      <CardHeader>
        <CardTitle>Variantes</CardTitle>
        <CardDescription>
          Crie tipos de variação (ex: Tamanho) e suas opções (ex: 250ml, 500ml,
          1 litro).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {variantTypes.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma variação configurada. Produtos sem variação são vendidos
            como item único.
          </p>
        )}

        {variantTypes.map((variantType, typeIndex) => (
          <div
            key={variantType.id}
            className="flex flex-col gap-3 rounded-lg border p-4"
          >
            <div className="flex items-center gap-2">
              <IconGripVertical className="size-4 shrink-0 text-muted-foreground" />
              <Controller
                name={`variantTypes.${typeIndex}.name`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Input
                      {...field}
                      placeholder="Nome da variação (ex: Tamanho)"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeVariantType(typeIndex)}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>

            <Separator />

            <VariantOptionsList typeIndex={typeIndex} />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            appendVariantType({ name: '', options: [{ label: '' }] })
          }
        >
          <IconPlus />
          Adicionar tipo de variação
        </Button>
      </CardContent>
    </Card>
  )
}

function VariantOptionsList({ typeIndex }: { typeIndex: number }) {
  const form = useFormContext<EditProductFormValues>()
  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `variantTypes.${typeIndex}.options`,
  })

  return (
    <div className="flex flex-col gap-2 pl-6">
      <FieldLabel className="text-xs text-muted-foreground">Opções</FieldLabel>
      {options.map((option, optionIndex) => (
        <div key={option.id} className="flex items-center gap-2">
          <Controller
            name={`variantTypes.${typeIndex}.options.${optionIndex}.label`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1">
                <Input {...field} placeholder="Ex: 500ml" className="h-8" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => remove(optionIndex)}
            disabled={options.length === 1}
          >
            <IconTrash className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-fit text-xs"
        onClick={() => append({ label: '' })}
      >
        <IconPlus className="size-3.5" />
        Adicionar opção
      </Button>
    </div>
  )
}
