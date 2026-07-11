export const productKeys = {
  find: ['GET /product'] as const,
  delete: (id: string) => ['DELETE /product', id] as const,
  updateAvailability: (id: string) =>
    ['PUT /product/availability', id] as const,
}
