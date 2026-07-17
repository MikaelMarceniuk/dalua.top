import { z } from 'zod'

export const connectIntegrationSchema = z.object({
  accessToken: z.string().min(1, 'Access Token é obrigatório'),
  publicKey: z.string().min(1, 'Public Key é obrigatória'),
})

export type ConnectIntegrationValues = z.infer<typeof connectIntegrationSchema>
