import { PRODUCT_UPLOADS_DIR } from '@/constants/upload-dir.constant'
import { productImages } from '@/db/schemas'
import { dbPlugin } from '@/plugins/db.plugin'
import { eq } from 'drizzle-orm'
import Elysia, { t } from 'elysia'
import { unlink } from 'node:fs/promises'
import { basename, join } from 'node:path'

export const updateProductImageRoute = new Elysia().use(dbPlugin).patch(
  '/:id/image',
  async ({ db, body, params, status }) => {
    const dbProduct = await db.query.products.findFirst({
      where: (fields, { eq }) => eq(fields.id, params.id),
    })
    if (!dbProduct) {
      return status(404, { message: 'Product not found' })
    }

    await db.transaction(async (ctx) => {
      for (const img of body.images) {
        if (img.action == 'keep') {
          await ctx
            .update(productImages)
            .set({ isHighlighted: img.isHighlighted })
            .where(eq(productImages.id, img.id))
        }

        if (img.action == 'delete') {
          const pImage = await ctx.query.productImages.findFirst({
            where: (fields, { eq }) => eq(fields.id, img.id),
          })
          if (!pImage) continue

          const fileName = basename(pImage.imageUri)
          const filePath = join(PRODUCT_UPLOADS_DIR, fileName)
          await unlink(filePath)

          await ctx.delete(productImages).where(eq(productImages.id, img.id))
        }
      }
    })

    return status(204)
  },
  {
    body: t.Object({
      images: t.Array(
        t.Object({
          kind: t.Literal('existing'),
          id: t.String({ format: 'uuid' }),
          imageUri: t.String(),
          isHighlighted: t.Boolean(),
          action: t.Union([t.Literal('keep'), t.Literal('delete')]),
        }),
      ),
    }),
    params: t.Object({ id: t.String({ format: 'uuid' }) }),
  },
)
