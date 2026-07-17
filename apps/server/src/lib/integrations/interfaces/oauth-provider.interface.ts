import { IntegrationProvider } from '@/db/schemas'

export interface OAuthIntegrationProvider {
  provider: IntegrationProvider
  getAuthorizationUrl(state: string): string
  exchangeCodeForToken(code: string): Promise<{
    accessToken: string
    refreshToken?: string
    expiresIn?: number
    accountId?: string
  }>
}
