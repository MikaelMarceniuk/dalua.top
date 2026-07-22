export const integrationKeys = {
  find: ['GET /integration'] as const,
  findFields: (provider?: string) =>
    ['GET /integration/fields', provider] as const,
}
