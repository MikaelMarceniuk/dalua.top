import { productPresenter } from '@/api/presenters/product.presenter'
import { orderItems, products } from '@/db/schemas'
import { authPlugin } from '@/plugins/auth.plugin'
import { dbPlugin } from '@/plugins/db.plugin'
import { rolePlugin } from '@/plugins/role.plugin'
import { count, eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

export const createProductRoute = new Elysia()
  // .use(authPlugin)
  // .use(rolePlugin)
  .use(dbPlugin)
  .post(
    '/',
    async ({ db, body, status }) => {
      const [newProduct] = await db
        .insert(products)
        .values({
          name: body.name,
          description: body.description,
          priceInCents: body.priceInCents,
          isAvailableForPurchase: body.isAvailableForPurchase,
        })
        .returning()

      return status(201, {
        product: productPresenter({
          product: newProduct,
        }),
      })
    },
    {
      // auth: true,
      // roles: 'admin',
      body: t.Object({
        name: t.String({ minLength: 3 }),
        description: t.String({ minLength: 3 }),
        priceInCents: t.Number({ minimum: 1 }),
        isAvailableForPurchase: t.Boolean({ default: false }),
      }),
    },
  )
