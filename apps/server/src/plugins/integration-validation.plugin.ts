import { IntegrationProvider } from '@/db/schemas'
import Elysia from 'elysia'
import { dbPlugin } from './db.plugin'
import { apiKeyProviders } from '@/lib/integrations/api-key-providers'

export const integrationPlugin = new Elysia({
  name: 'integration-validator',
})
  .use(dbPlugin)
  .derive(async ({ params, db, status }) => {
    const provider = params?.provider as IntegrationProvider
    if (!provider) {
      return status(400, { message: 'Provider parameter is missing' })
    }

    const dbIntegration = await db.query.integration.findFirst({
      where: (fields, { eq }) => eq(fields.provider, provider),
    })
    if (!dbIntegration) {
      return status(404, { message: 'Provider not supported' })
    }

    const integrationProvider = apiKeyProviders[dbIntegration.provider]
    if (!integrationProvider) {
      return status(404, { message: 'Provider not supported' })
    }

    return {
      dbIntegration,
      integrationProvider,
    }
  })
  .as('scoped')
