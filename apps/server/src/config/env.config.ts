import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['DEV', 'HOMOL', 'PRD']),
  PORT: z.coerce.number().optional().default(3333),
  ALLOWED_ORIGINS: z.url('ALLOWED_ORIGINS deve ser uma URL válida'),

  DATABASE_URL: z
    .url('DATABASE_URL deve ser uma URL válida')
    .refine(
      (url) => url.startsWith('postgres://') || url.startsWith('postgresql://'),
      'DATABASE_URL deve usar protocolo postgres',
    ),

  BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET muito curta'),
  BETTER_AUTH_URL: z.url('BETTER_AUTH_URL deve ser uma URL válida'),
  BETTER_AUTH_FRONTEND_DOMAIN: z
    .string()
    .min(1, 'BETTER_AUTH_FRONTEND_DOMAIN deve ser uma string válida'),

  RESEND_API_KEY: z
    .string()
    .min(1, 'RESEND_API_KEY deve ser uma string válida'),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('❌ Erro na validação das variáveis de ambiente:')
  console.error(z.treeifyError(parsedEnv.error))
  process.exit(1)
}

export const env = parsedEnv.data
