export const productKeys = {
  find: ['GET /product'] as const,
  findBySlug: (slug: string) => ['GET /product/slug', slug] as const,
  create: ['POST /product'] as const,
  update: (id?: string) => ['PUT /product', id || undefined] as const,
  delete: (id: string) => ['DELETE /product', id] as const,
  updateAvailability: (id: string) =>
    ['PUT /product/availability', id] as const,
}
