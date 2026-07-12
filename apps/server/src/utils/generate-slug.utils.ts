import { db } from '@/db'
import slugify from 'slugify'

export async function generateUniqueSlug(name: string, excludeId?: string) {
  const base = slugify(name, { lower: true, strict: true })
  let slug = base
  let counter = 1

  while (true) {
    const existing = await db.query.products.findFirst({
      where: (products, { eq, ne, and }) =>
        excludeId
          ? and(eq(products.slug, slug), ne(products.id, excludeId))
          : eq(products.slug, slug),
    })
    if (!existing) return slug
    slug = `${base}-${++counter}`
  }
}
