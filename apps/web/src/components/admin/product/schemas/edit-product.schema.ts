import { z } from 'zod'
import { productImageSchema } from './product-image.schema'

const variantOptionSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'Informe o valor da opção'),
})

const variantTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Informe o nome da variação'),
  options: z.array(variantOptionSchema).min(1, 'Adicione ao menos uma opção'),
})

const contentBlockSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Informe a pergunta/título'),
  content: z.string().min(1, 'Informe a resposta/conteúdo'),
})

export const editProductFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  description: z.string().min(1, 'Descrição é obrigatória'),
  priceInCents: z
    .number({ error: 'Preço deve ser um número' })
    .int()
    .positive('Preço deve ser maior que zero'),
  isAvailableForPurchase: z.boolean(),
  images: z.array(productImageSchema).default([]),
  variantTypes: z.array(variantTypeSchema).default([]),
  contentBlocks: z.array(contentBlockSchema).default([]),
})

export type EditProductFormValues = z.infer<typeof editProductFormSchema>
