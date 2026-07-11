import z from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  description: z.string().min(1, 'Descrição é obrigatória'),
  priceInCents: z
    .number({ error: 'Preço deve ser um número' })
    .int()
    .positive('Preço deve ser maior que zero'),
  isAvailableForPurchase: z.boolean(),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Imagem deve ter no máximo 5MB'
    )
    .refine(
      (file) => !file || file.type.startsWith('image/'),
      'Arquivo deve ser uma imagem'
    ),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
