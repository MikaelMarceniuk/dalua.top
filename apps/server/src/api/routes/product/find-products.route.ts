import { productPresenter } from '@/api/presenters/product.presenter'
import { orderItems, products } from '@/db/schemas'
import { authPlugin } from '@/plugins/auth.plugin'
import { dbPlugin } from '@/plugins/db.plugin'
import { rolePlugin } from '@/plugins/role.plugin'
import { count, eq, getTableColumns } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

export const findProductRoute = new Elysia()
  .use(authPlugin)
  .use(rolePlugin)
  .use(dbPlugin)
  .get(
    '/',
    async ({ db }) => {
      const dbProducts = await db
        .select({
          ...getTableColumns(products),
          orderCount: count(orderItems.id),
        })
        .from(products)
        .leftJoin(orderItems, eq(orderItems.productId, products.id))
        .groupBy(products.id)

      return {
        products: dbProducts.map((p) =>
          productPresenter({ product: p, orderCount: p.orderCount }),
        ),
      }
    },
    { auth: true, roles: 'admin' },
  )
