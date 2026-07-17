import { Elysia, t } from 'elysia'
import { dbPlugin } from '@/plugins/db.plugin'
import { apiKeyProviders } from '@/lib/integrations/api-key-providers'
import { encryptCredentials } from '@/utils/credentials-encryption.utils'
import { eq } from 'drizzle-orm'
import { integrationPlugin } from '@/plugins/integration-validation.plugin'
import { integration } from '@/db/schemas'

export const connectIntegrationRoute = new Elysia()
  .use(dbPlugin)
  .use(integrationPlugin)
  .post(
    '/:provider/connect',
    async ({ db, body, dbIntegration, integrationProvider, status }) => {
      const result = await integrationProvider.validateCredentials({ ...body })

      if (!result.isValid) {
        return status(422, { message: result.error })
      }

      const encryptedCredentials = encryptCredentials({
        accessToken: body.accessToken,
        publicKey: body.publicKey,
      })

      await db
        .update(integration)
        .set({
          encryptedCredentials,
          isConnected: true,
          connectedAt: new Date(),
        })
        .where(eq(integration.provider, dbIntegration.provider))

      return status(200)
    },
    {
      body: t.Object({
        accessToken: t.String({ minLength: 1 }),
        publicKey: t.String({ minLength: 1 }),
      }),
      params: t.Object({
        provider: t.String(),
      }),
    },
  )
