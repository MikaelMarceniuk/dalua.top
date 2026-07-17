import { ApiKeyIntegrationProvider } from './interfaces/api-key-provider.interface'
import { mercadoPagoProvider } from './payment/mercado-pago.integration'

export const apiKeyProviders: Record<string, ApiKeyIntegrationProvider> = {
  mercado_pago: mercadoPagoProvider,
}
