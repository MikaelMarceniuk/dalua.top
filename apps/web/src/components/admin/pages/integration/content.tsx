'use client'

import { Separator } from '@/components/ui/separator'
import { IntegrationSection } from './components/integration-section'
import { IconCreditCard, IconTruck } from '@tabler/icons-react'
import { Integration } from './types/integration.type'

const paymentIntegrations: Integration[] = [
  {
    id: 'mercado-pago',
    name: 'Mercado Pago',
    description:
      'Receba pagamentos via Pix, boleto e cartão através do Mercado Pago.',
    logo: '/integrations/mercado-pago.svg',
    isConnected: true,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description:
      'Aceite pagamentos internacionais com cartão de crédito via Stripe.',
    logo: '/integrations/stripe.svg',
    isConnected: false,
  },
]

const logisticsIntegrations: Integration[] = [
  {
    id: 'melhor-envio',
    name: 'Melhor Envio',
    description: 'Calcule fretes e gere etiquetas de envio automaticamente.',
    logo: '/integrations/melhor-envio.svg',
    isConnected: false,
  },
]

export const IntegrationContent = () => {
  return (
    <div className="flex flex-col gap-8 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Integrações</h1>
        <p className="text-sm text-muted-foreground">
          Conecte serviços externos para processar pagamentos e gerenciar
          envios.
        </p>
      </div>

      <IntegrationSection
        icon={IconCreditCard}
        title="Integrações de pagamento"
        description="Escolha os provedores usados para processar pagamentos da sua loja."
        integrations={paymentIntegrations}
      />

      <Separator />

      <IntegrationSection
        icon={IconTruck}
        title="Integrações de logística"
        description="Configure serviços de frete e envio para seus pedidos."
        integrations={logisticsIntegrations}
      />
    </div>
  )
}
