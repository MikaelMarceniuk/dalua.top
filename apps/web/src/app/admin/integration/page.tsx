'use client'

import { IntegrationContent } from '@/components/admin/pages/integration/content'
import { AppHeader } from '@/components/admin/ui/app-header'

export default function IntegrationsPage() {
  return (
    <>
      <AppHeader
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Integrações' },
        ]}
      />
      <IntegrationContent />
    </>
  )
}
