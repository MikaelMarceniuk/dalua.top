import { NextRequest, NextResponse } from 'next/server'
import {
  WebhookSignatureValidator,
  InvalidWebhookSignatureError,
} from 'mercadopago'

type WebhookHandler = (req: NextRequest) => Promise<NextResponse>

export const withWebhookValidation = (handler: WebhookHandler) => {
  return async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams

    const xSignature = req.headers.get('x-signature')
    const xRequestId = req.headers.get('x-request-id')
    const dataId = searchParams.get('data.id')

    try {
      WebhookSignatureValidator.validate({
        xSignature,
        xRequestId,
        dataId,
        secret: process.env.MP_WEBHOOK_SECRET!,
      })
    } catch (err) {
      if (err instanceof InvalidWebhookSignatureError) {
        console.log('Invalid webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
      throw err
    }

    return handler(req)
  }
}
