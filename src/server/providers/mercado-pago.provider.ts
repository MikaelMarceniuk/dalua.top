import { MercadoPagoConfig, Preference } from 'mercadopago'
import {
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  WebhookResult,
} from '../interfaces/payment-provider.interface'

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 },
})

export class MercadoPagoProvider implements PaymentProvider {
  name = 'mercado_pago' as const

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const preference = new Preference(mp)

    const prefResponse = await preference.create({
      body: {
        external_reference: input.orderId,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercado-pago`,
        expires: true,
        expiration_date_to: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min
        items: input.items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unitPriceInCents / 100,
        })),
      },
    })

    return {
      externalReferenceId: prefResponse.id!,
      redirectUrl: prefResponse.init_point!,
    }
  }

  async parseWebhook(
    payload: unknown,
    headers: Headers
  ): Promise<WebhookResult> {
    throw new Error('Not implemented yet')
  }
}
