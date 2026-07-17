import { IconCreditCard, IconTruck, IconMail } from '@tabler/icons-react'
import { IntegrationGroup } from '../types/integration.type'

type IntegrationGroupConfig = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export const integrationGroupConfig: Record<
  IntegrationGroup,
  IntegrationGroupConfig
> = {
  payment: {
    icon: IconCreditCard,
    title: 'Integrações de pagamento',
    description:
      'Escolha os provedores usados para processar pagamentos da sua loja.',
  },
  logistic: {
    icon: IconTruck,
    title: 'Integrações de logística',
    description: 'Configure serviços de frete e envio para seus pedidos.',
  },
  // email: {
  //   icon: IconMail,
  //   title: 'Integrações de e-mail',
  //   description: 'Configure o envio automático de e-mails transacionais.',
  // },
}
