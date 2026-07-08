import { MercadoPagoProvider } from '../providers/mercado-pago.provider'

export type CreatePaymentItem = {
  id: string
  title: string
  quantity: number
  unitPriceInCents: number
}

export type CreatePaymentInput = {
  orderId: string
  items: CreatePaymentItem[]
}

export type CreatePaymentResult = {
  externalReferenceId: string // ID gerado pelo provider (preference id, payment intent id, etc)
  redirectUrl: string // pra onde o usuário deve ser redirecionado
}

export type WebhookResult = {
  externalReferenceId: string
  externalPaymentId: string
  status: 'approved' | 'rejected' | 'pending'
}

export interface PaymentProvider {
  name: 'mercado_pago'
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>
  parseWebhook(payload: unknown, headers: Headers): Promise<WebhookResult>
}

const providers: Record<string, PaymentProvider> = {
  mercado_pago: new MercadoPagoProvider(),
}

export const getPaymentProvider = (
  name: keyof typeof providers
): PaymentProvider => {
  const provider = providers[name]
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`)
  }
  return provider
}
