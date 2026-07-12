import z from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  description: z.string().min(1, 'Descrição é obrigatória'),
  priceInCents: z
    .number({ error: 'Preço deve ser um número' })
    .int()
    .positive('Preço deve ser maior que zero'),
})

export type CreateProductFormValues = z.infer<typeof createProductSchema>
