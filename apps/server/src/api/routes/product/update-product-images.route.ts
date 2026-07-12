import { Elysia, t } from 'elysia'
import { randomUUID } from 'node:crypto'
import { join } from 'node:path'
import { optimizeImage } from '@/utils/optimize-image.utils'
import { db } from '@/db'
import { dbPlugin } from '@/plugins/db.plugin'
import { PRODUCT_UPLOADS_DIR } from '@/constants/upload-dir.constant'
import { productImages } from '@/db/schemas'
import { env } from '@/config/env.config'
import { eq } from 'drizzle-orm'

export const updateProductImageRoute = new Elysia().use(dbPlugin).put(
  '/:id/image',
  async ({ body, params, status }) => {
    const dbProduct = await db.query.products.findFirst({
      where: (fields, { eq }) => eq(fields.id, params.id),
    })
    if (!dbProduct) {
      return status(404, { message: 'Product not found' })
    }

    const files = Array.isArray(body.images) ? body.images : [body.images]
    await Promise.all(
      files.map(async (file) => {
        const optimizedBuffer = await optimizeImage(file)
        const fileName = `${randomUUID()}.webp`
        const filePath = join(PRODUCT_UPLOADS_DIR, fileName)

        await Bun.write(filePath, optimizedBuffer)
        const imageUri = `${env.API_URL}/uploads/products/${fileName}`

        await db.insert(productImages).values({
          productId: dbProduct.id,
          imageUri,
        })
      }),
    )

    return status(204)
  },
  {
    body: t.Object({
      images: t.Files({
        maxSize: '8m',
        type: ['image/jpeg', 'image/png', 'image/webp'],
        minItems: 1,
        maxItems: 10,
      }),
    }),
    params: t.Object({
      id: t.String({ format: 'uuid' }),
    }),
  },
)
