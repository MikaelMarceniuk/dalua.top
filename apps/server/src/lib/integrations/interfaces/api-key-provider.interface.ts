import { IntegrationProvider } from '@/db/enums/integration.enums'

type ValidateCredentialsReturn = {
  isValid: boolean
  error?: string
}

export interface ApiKeyIntegrationProvider {
  provider: IntegrationProvider
  validateCredentials: (
    credentials: Record<string, string>,
  ) => Promise<ValidateCredentialsReturn>
}
