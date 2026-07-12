'use client'

import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { IconPlus, IconTrash, IconGripVertical } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldError } from '@/components/ui/field'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { EditProductFormValues } from '../../schemas/edit-product.schema'

export const ContentForm = () => {
  const form = useFormContext<EditProductFormValues>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contentBlocks',
  })

  return (
    <Card id="content" className="scroll-mt-20">
      <CardHeader>
        <CardTitle>Conteúdos</CardTitle>
        <CardDescription>
          Blocos exibidos como accordion na página do produto (ex: Benefícios,
          Modo de uso).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhum bloco de conteúdo adicionado ainda.
          </p>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-lg border p-4"
          >
            <div className="flex items-center gap-2">
              <IconGripVertical className="size-4 shrink-0 text-muted-foreground" />
              <Controller
                name={`contentBlocks.${index}.title`}
                control={form.control}
                render={({ field: titleField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Input
                      {...titleField}
                      placeholder="Título (ex: Benefícios)"
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
                onClick={() => remove(index)}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>

            <Controller
              name={`contentBlocks.${index}.content`}
              control={form.control}
              render={({ field: contentField, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...contentField}
                    placeholder="Conteúdo (HTML) exibido ao expandir"
                    className="min-h-24 resize-none font-mono text-xs"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => append({ title: '', content: '' })}
        >
          <IconPlus />
          Adicionar bloco
        </Button>
      </CardContent>
    </Card>
  )
}
