'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ImageUploadFieldProps {
  value?: File | null
  onChange: (file: File | null) => void
  /** URL de uma imagem já existente (modo edição) */
  existingImageUrl?: string | null
  disabled?: boolean
}

export function ImageUploadField({
  value,
  onChange,
  existingImageUrl,
  disabled,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const previewUrl = value
    ? URL.createObjectURL(value)
    : existingImageUrl || null

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return
      onChange(file)
    },
    [onChange]
  )

  return (
    <div
      className={cn(
        'relative flex min-h-50 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center transition-colors',
        isDragging && 'border-primary bg-muted/50',
        disabled && 'pointer-events-none opacity-50'
      )}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFile(e.dataTransfer.files?.[0])
      }}
    >
      {previewUrl ? (
        <>
          <div className="relative h-40 w-40 overflow-hidden rounded-md border">
            <Image
              src={previewUrl}
              alt="Preview do produto"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              onChange(null)
              if (inputRef.current) inputRef.current.value = ''
            }}
          >
            <IconX />
            Remover imagem
          </Button>
        </>
      ) : (
        <>
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <IconPhoto className="size-6 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              Arraste uma imagem ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG ou WEBP (máx. 5MB)
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <IconUpload />
            Selecionar imagem
          </Button>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        disabled={disabled}
      />
    </div>
  )
}
