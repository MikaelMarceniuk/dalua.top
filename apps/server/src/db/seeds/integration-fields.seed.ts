import { Db } from '..'
import {
  integrationFieldDefinition,
  NewIntegrationFieldDefinition,
} from '../schemas'

const integrationFields: NewIntegrationFieldDefinition[] = [
  // Mercado Pago
  {
    provider: 'mercado_pago',
    key: 'access_token',
    label: 'Access Token',
    placeholder: 'APP_USR-xxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxx',
    description:
      'Chave secreta usada para autenticar as cobranças no servidor.',
    type: 'password',
    isSecret: true,
    isRequired: true,
    position: 0,
  },
  {
    provider: 'mercado_pago',
    key: 'public_key',
    label: 'Public Key',
    placeholder: 'APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    description: null,
    type: 'text',
    isSecret: false,
    isRequired: true,
    position: 1,
  },
  // Melhor Envio
  {
    provider: 'melhor_envio',
    key: 'client_id',
    label: 'Client ID',
    placeholder: '1234',
    type: 'text',
    isSecret: false,
    isRequired: true,
    position: 0,
  },
]

export async function seedIntegrationFields(db: Db) {
  console.log(
    '\n🌱 [Seed:IntegrationFields] Iniciando seed de campos de integração...',
  )

  const created: string[] = []
  const skipped: string[] = []

  await db.transaction(async (ctx) => {
    const dbFields = await ctx.query.integrationFieldDefinition.findMany()

    for (const field of integrationFields) {
      const doesFieldExist = dbFields.some(
        ({ provider, key }) => provider === field.provider && key === field.key,
      )

      const label = `${field.provider}.${field.key}`

      if (doesFieldExist) {
        skipped.push(label)
        continue
      }

      await ctx.insert(integrationFieldDefinition).values(field)
      created.push(label)
    }
  })

  console.log('┌────────────────────────────────────────────')
  if (created.length) {
    console.log(`│ ✅ Criados (${created.length}):`)
    created.forEach((f) => console.log(`│    • ${f}`))
  }
  if (skipped.length) {
    console.log(`│ ⏭️  Já existiam (${skipped.length}):`)
    skipped.forEach((f) => console.log(`│    • ${f}`))
  }
  console.log('└────────────────────────────────────────────')
  console.log(
    `🌱 [Seed:IntegrationFields] Concluído — ${created.length} criados, ${skipped.length} ignorados.\n`,
  )
}
