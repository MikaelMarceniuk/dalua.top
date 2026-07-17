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
import { NewProductImage } from '../../schemas/product-image.schema'

export const ImagesForm = () => {
  const form = useFormContext<EditProductFormValues>()
  const inputRef = useRef<HTMLInputElement>(null)
  const images = form.watch('images')

  const handleAddFiles = (files: FileList | null) => {
    if (!files?.length) return

    const newImages = Array.from(files).map((file): NewProductImage => ({
      kind: 'new',
      file,
      imageUri: URL.createObjectURL(file),
      isHighlighted: images.length === 0,
    }))

    form.setValue('images', [...images, ...newImages], { shouldDirty: true })
  }

  const handleRemove = (index: number) => {
    const imageToRemove = images[index]
    if (!imageToRemove) return

    const wasHighlighted = imageToRemove.isHighlighted

    const next =
      imageToRemove.kind === 'existing'
        ? images.map((image, i) =>
            i === index ? { ...image, action: 'delete' as const } : image
          )
        : images.filter((_, i) => i !== index)

    const visibleImages = next.filter(
      (image) => !(image.kind === 'existing' && image.action === 'delete')
    )

    if (wasHighlighted && visibleImages.length > 0) {
      const firstVisibleIndex = next.findIndex(
        (image) => image === visibleImages[0]
      )
      next[firstVisibleIndex] = {
        ...next[firstVisibleIndex],
        isHighlighted: true,
      }
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
          {images.map((image, index) => {
            if (image.kind === 'existing' && image.action === 'delete') {
              return null
            }

            return (
              <div
                key={image.kind === 'existing' ? image.id : image.imageUri}
                className="group relative aspect-square overflow-hidden rounded-lg border"
              >
                <Image
                  src={image.imageUri ?? ''}
                  alt={`Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
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
            )
          })}

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
