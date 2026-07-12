'use client'

import { useFormContext } from 'react-hook-form'
import {
  IconStar,
  IconStarFilled,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { EditProductFormValues } from '../../schemas/edit-product.schema'

export const ImagesForm = () => {
  const form = useFormContext<EditProductFormValues>()
  const inputRef = useRef<HTMLInputElement>(null)
  const images = form.watch('images')

  function handleAddFiles(files: FileList | null) {
    if (!files?.length) return

    const newImages = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isHighlighted: images.length === 0,
    }))

    form.setValue('images', [...images, ...newImages], { shouldDirty: true })
  }

  function handleRemove(index: number) {
    const next = images.filter((_, i) => i !== index)
    // se removeu a destacada, marca a primeira restante
    if (images[index]?.isHighlighted && next.length > 0) {
      next[0] = { ...next[0], isHighlighted: true }
    }
    form.setValue('images', next, { shouldDirty: true })
  }

  function handleSetHighlight(index: number) {
    form.setValue(
      'images',
      images.map((img, i) => ({ ...img, isHighlighted: i === index })),
      { shouldDirty: true }
    )
  }

  return (
    <Card id="images" className="scroll-mt-20">
      <CardHeader>
        <CardTitle>Imagens</CardTitle>
        <CardDescription>
          Adicione as imagens do produto. Marque uma como destaque — ela será a
          capa exibida na listagem.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.id ?? image.previewUrl}
              className="group relative aspect-square overflow-hidden rounded-lg border"
            >
              <Image
                src={image.previewUrl ?? ''}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="size-7"
                  onClick={() => handleSetHighlight(index)}
                  title="Marcar como destaque"
                >
                  {image.isHighlighted ? (
                    <IconStarFilled className="size-4 text-yellow-400" />
                  ) : (
                    <IconStar className="size-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="size-7"
                  onClick={() => handleRemove(index)}
                >
                  <IconTrash className="size-4" />
                </Button>
              </div>
              {image.isHighlighted && (
                <span className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  Destaque
                </span>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <IconUpload className="size-5" />
            <span className="text-xs font-medium">Adicionar</span>
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleAddFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </CardContent>
    </Card>
  )
}
