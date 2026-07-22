import { db } from '..'
import { seedIntegrationFields } from './integration-fields.seed'
import { integrationSeed } from './integration.seed'

const seeder = async () => {
  await integrationSeed(db)
  await seedIntegrationFields(db)
}

await seeder()
