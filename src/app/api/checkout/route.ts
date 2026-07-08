import { NextResponse } from 'next/server'
import { withAuth } from '../_middlewares/withAuth.middleware'
import z from 'zod'
import { db } from '@/server/db'
import { orderItems, orders, payments, products } from '@/server/db/schemas'
import { inArray } from 'drizzle-orm'
import { getPaymentProvider } from '@/server/interfaces/payment-provider.interface'

const bodySchema = z.object({
  items: z
    .array(
      z.object({
        id: z.uuid(),
        quantity: z.number(),
      })
    )
    .min(1),
  couponCode: z.string().optional(),
})

const POST = withAuth(async (req, { user }) => {
  const body = await req.json()
  const parsed = bodySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request body', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { items, couponCode } = parsed.data

  const productIds = items.map((item) => item.id)
  const productsFromDb = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds))

  if (productsFromDb.length !== items.length) {
    return NextResponse.json(
      { error: 'One or more products not found' },
      { status: 404 }
    )
  }

  const unavailable = productsFromDb.filter((p) => !p.isAvailableForPurchase)
  if (unavailable.length > 0) {
    return NextResponse.json(
      { error: 'One or more products are unavailable', unavailable },
      { status: 400 }
    )
  }

  const couponDiscountInCents = 0
  // if (couponCode) { ... }

  const orderItemsData = items.map((item) => {
    const product = productsFromDb.find((p) => p.id === item.id)!
    return {
      productId: product.id,
      quantity: item.quantity,
      priceInCentsAtPurchase: product.priceInCents,
    }
  })

  const totalInCents =
    orderItemsData.reduce(
      (sum, item) => sum + item.priceInCentsAtPurchase * item.quantity,
      0
    ) - couponDiscountInCents

  try {
    const initPoint = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          userId: user.id,
          totalInCents,
          status: 'pending',
        })
        .returning()

      await tx.insert(orderItems).values(
        orderItemsData.map((item) => ({
          ...item,
          orderId: order.id,
        }))
      )

      const paymentProvider = getPaymentProvider('mercado_pago')

      let result
      try {
        result = await paymentProvider.createPayment({
          orderId: order.id,
          items: orderItemsData.map((item) => {
            const product = productsFromDb.find((p) => p.id === item.productId)!
            return {
              id: product.id,
              title: product.name,
              quantity: item.quantity,
              unitPriceInCents: item.priceInCentsAtPurchase,
            }
          }),
        })
      } catch (e) {
        console.log('Error creating payment: ', e)
        throw new Error('PAYMENT_PROVIDER_FAILED')
      }

      await tx.insert(payments).values({
        orderId: order.id,
        provider: paymentProvider.name,
        externalReferenceId: result.externalReferenceId,
        status: 'pending',
      })

      return result.redirectUrl
    })

    return NextResponse.json({ init_point: initPoint }, { status: 201 })
  } catch (e) {
    if (e instanceof Error && e.message === 'MERCADO_PAGO_FAILED') {
      return NextResponse.json(
        { error: 'Failed to create preference' },
        { status: 500 }
      )
    }

    console.log('Error in checkout transaction: ', e)
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    )
  }
})

export { POST }
