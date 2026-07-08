import { mp } from '@/server/providers/mercado-pago.provider'
import { Payment } from 'mercadopago'
import { NextRequest, NextResponse } from 'next/server'
import { PaymentCreatedBody } from './_types/payment-created-body.type'
import { db } from '@/server/db'
import { payments, PaymentStatus } from '@/server/db/schemas'
import { eq } from 'drizzle-orm'
import { withWebhookValidation } from '../../_middlewares/withWebhookValidation.middleware'

type MPTopics = 'merchant_order' | 'payment'

export const POST = withWebhookValidation(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const body = JSON.parse(await req.text())

  if ((searchParams.get('type') as MPTopics) == 'merchant_order') {
    return NextResponse.json({ received: true }, { status: 200 })
  }

  const { action } = body

  if (action == 'payment.created') {
    try {
      const { data } = body as PaymentCreatedBody
      const payment = new Payment(mp)
      const mpPayment = await payment.get({ id: data.id })

      await db
        .update(payments)
        .set({
          status: mpPayment.status as PaymentStatus,
          externalPaymentId: mpPayment.id!.toString(),
        })
        .where(eq(payments.orderId, mpPayment.external_reference!))

      return NextResponse.json({ received: true }, { status: 200 })
    } catch (e) {
      console.log('Error in MP') // TODO Improve
      return NextResponse.json({ received: true }, { status: 200 })
    }
  }

  if (action == 'payment.updated') {
    try {
      const { data } = body as PaymentCreatedBody
      const payment = new Payment(mp)
      const mpPayment = await payment.get({ id: data.id })

      await db
        .update(payments)
        .set({
          status: mpPayment.status as PaymentStatus,
        })
        .where(eq(payments.orderId, mpPayment.external_reference!))

      return NextResponse.json({ received: true }, { status: 200 })
    } catch (e) {
      console.log('Error in MP') // TODO Improve
      return NextResponse.json({ received: true }, { status: 200 })
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
})
