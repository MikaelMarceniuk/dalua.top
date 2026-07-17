export const integrationProviderEnum = ['mercado_pago', 'melhor_envio'] as const
export type IntegrationProvider = (typeof integrationProviderEnum)[number]

export const integrationGroupEnum = ['payment', 'logistic'] as const
export type IntegrationGroup = (typeof integrationGroupEnum)[number]

export const integrationConnectionTypeEnum = ['api-key', 'oauth'] as const
export type IntegrationConnectionType =
  (typeof integrationConnectionTypeEnum)[number]

export type Integration = {
  id: string
  group: IntegrationGroup
  provider: IntegrationProvider
  connectionType: IntegrationConnectionType
  isConnected: boolean
}
