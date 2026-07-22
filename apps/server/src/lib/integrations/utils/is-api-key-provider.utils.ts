import { ApiKeyIntegrationProvider } from '../interfaces/api-key-provider.interface'
import { OAuthIntegrationProvider } from '../interfaces/oauth-provider.interface'

export function isApiKeyIntegrationProvider(
  provider: ApiKeyIntegrationProvider | OAuthIntegrationProvider,
): provider is ApiKeyIntegrationProvider {
  return 'validateCredentials' in provider
}
