import { env } from '@/config/env.config'
import { PRODUCT_UPLOADS_DIR } from '@/constants/upload-dir.constant'
import { productImages } from '@/db/schemas'
import { dbPlugin } from '@/plugins/db.plugin'
import { optimizeImage } from '@/utils/optimize-image.utils'
import { randomUUIDv7 } from 'bun'
import Elysia, { t } from 'elysia'
import { join } from 'node:path'
import { unlink } from 'node:fs/promises'
import { eq } from 'drizzle-orm'

const parseHighlightFlags = (
  raw: string | string[],
  expectedLength: number,
): boolean[] => {
  const values = Array.isArray(raw) ? raw : [raw]

  if (values.length !== expectedLength) {
    return [] // deixa a validação de length existente pegar isso
  }

  return values.map((value) => value === 'true')
}

export const createProductImageRoute = new Elysia().use(dbPlugin).post(
  '/:id/image',
  async ({ db, body, params, status }) => {
    const dbProduct = await db.query.products.findFirst({
      where: (fields, { eq }) => eq(fields.id, params.id),
    })
    if (!dbProduct) {
      return status(404, { message: 'Product not found' })
    }

    const files = Array.isArray(body.images) ? body.images : [body.images]
    const highlights = parseHighlightFlags(body.isHighlighted, files.length)

    if (files.length !== highlights.length) {
      return status(400, {
        message: 'Number of images and highlight flags do not match.',
      })
    }

    const processedFiles = await Promise.all(
      files.map(async (file, index) => {
        const optimizedBuffer = await optimizeImage(file)
        const fileName = `${randomUUIDv7()}.webp`
        const filePath = join(PRODUCT_UPLOADS_DIR, fileName)

        await Bun.write(filePath, optimizedBuffer)

        return {
          filePath,
          imageUri: `${env.API_URL}/uploads/products/${fileName}`,
          isHighlighted: highlights[index],
        }
      }),
    )

    try {
      await db.transaction(async (ctx) => {
        if (highlights.some((h) => h)) {
          await ctx
            .update(productImages)
            .set({ isHighlighted: false })
            .where(eq(productImages.productId, dbProduct.id))
        }

        await ctx.insert(productImages).values(
          processedFiles.map((file) => ({
            productId: dbProduct.id,
            imageUri: file.imageUri,
            isHighlighted: file.isHighlighted,
          })),
        )
      })
    } catch (error) {
      await Promise.all(
        processedFiles.map((file) => unlink(file.filePath).catch(() => {})),
      )
      throw error
    }

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
      isHighlighted: t.Union([t.String(), t.Array(t.String())]),
    }),
    params: t.Object({ id: t.String({ format: 'uuid' }) }),
  },
)
