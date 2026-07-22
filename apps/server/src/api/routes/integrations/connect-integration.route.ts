import { Elysia, t } from 'elysia'
import { dbPlugin } from '@/plugins/db.plugin'
import { integrationPlugin } from '@/plugins/integration-validation.plugin'
import { IntegrationProvider } from '@/db/enums/integration.enums'
import { isApiKeyIntegrationProvider } from '@/lib/integrations/utils/is-api-key-provider.utils'
import { encryptCredentials } from '@/utils/credentials-encryption.utils'
import { integration } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export const connectIntegrationRoute = new Elysia()
  .use(dbPlugin)
  .use(integrationPlugin)
  .post(
    '/:provider/connect',
    async ({
      db,
      body,
      params,
      dbIntegration,
      integrationProvider,
      status,
    }) => {
      // Validacao de ApiKey
      if (!isApiKeyIntegrationProvider(integrationProvider)) {
        return status(400, {
          message: 'This provider requires OAuth connection, not API key.',
        })
      }

      // Validacao de Body
      const fieldDefs = await db.query.integrationFieldDefinition.findMany({
        where: (fields, { eq }) =>
          eq(fields.provider, params.provider as IntegrationProvider),
      })

      if (fieldDefs.length === 0) {
        return status(404, { message: 'Provider not found.' })
      }

      // valida que todos os campos obrigatórios vieram preenchidos
      const missingFields = fieldDefs
        .filter((field) => field.isRequired)
        .filter((field) => !body.credentials[field.key]?.trim())

      if (missingFields.length > 0) {
        return status(422, {
          message: `Missing required fields: ${missingFields.map((f) => f.key).join(', ')}`,
        })
      }

      // Validacao de credenciais
      const result = await integrationProvider.validateCredentials(
        body.credentials,
      )

      if (!result.isValid) {
        return status(422, { message: result.error ?? 'Invalid credentials' })
      }

      // Criptografia e salva
      const encryptedCredentials = encryptCredentials(body.credentials)
      await db
        .update(integration)
        .set({
          encryptedCredentials,
          isConnected: true,
          connectedAt: new Date(),
        })
        .where(eq(integration.provider, dbIntegration.provider))

      return status(200, { connected: true })
    },
    {
      params: t.Object({ provider: t.String() }),
      body: t.Object({
        credentials: t.Record(t.String(), t.String()),
      }),
    },
  )
