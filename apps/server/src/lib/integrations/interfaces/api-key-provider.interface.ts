import { IntegrationProvider } from '@/db/schemas'

type validateCredentialsParams = {
  accessToken: string
  publicKey: string
}

type validateCredentialReturn = {
  isValid: boolean
  error?: string
}

export interface ApiKeyIntegrationProvider {
  provider: IntegrationProvider
  validateCredentials: (
    credentials: validateCredentialsParams,
  ) => Promise<validateCredentialReturn>
}
