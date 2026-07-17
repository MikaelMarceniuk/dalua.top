import { z } from 'zod'

const existingImageSchema = z.object({
  kind: z.literal('existing'),
  id: z.string(),
  imageUri: z.string(),
  isHighlighted: z.boolean(),
  action: z.enum(['keep', 'delete']),
})

const newImageSchema = z.object({
  kind: z.literal('new'),
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'Imagem deve ter no máximo 5MB'
    )
    .refine(
      (file) => file.type.startsWith('image/'),
      'Arquivo deve ser uma imagem'
    ),
  imageUri: z.string(),
  isHighlighted: z.boolean(),
})

export const productImageSchema = z.discriminatedUnion('kind', [
  existingImageSchema,
  newImageSchema,
])

export type ExistingProductImage = z.infer<typeof existingImageSchema>
export type NewProductImage = z.infer<typeof newImageSchema>
export type ProductImage = z.infer<typeof productImageSchema>
