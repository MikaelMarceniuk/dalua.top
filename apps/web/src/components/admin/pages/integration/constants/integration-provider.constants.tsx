import { IntegrationProvider } from '../types/integration.type'

type IntegrationProviderConfig = {
  name: string
  image: string
}

export const IntegrationProviderConfig: Record<
  IntegrationProvider,
  IntegrationProviderConfig
> = {
  mercado_pago: {
    name: 'Mercado Pago',
    image: '/logos/mercado-pago.png',
  },
  melhor_envio: {
    name: 'Melhor Envio',
    image: '/logos/melhor-envio.png',
  },
}
