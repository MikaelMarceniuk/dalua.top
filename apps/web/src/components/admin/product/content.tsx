'use client'

import { DataTable } from '../ui/data-table/data-table'
import { DataTableFilterConfig } from '../ui/data-table/types'
import { columns } from './columns'
import { useFindProducts } from '@/hooks/use-find-products.hook'

const productFilters: DataTableFilterConfig[] = [
  {
    type: 'text',
    columnId: 'name',
    title: 'Nome',
    placeholder: 'Buscar produto...',
  },
  {
    type: 'select',
    columnId: 'isAvailableForPurchase',
    title: 'Status',
    multiple: true,
    options: [
      { label: 'Disponível', value: 'true' },
      { label: 'Indisponível', value: 'false' },
    ],
  },
]

export const ProductContent: React.FC = () => {
  const { products, isPending } = useFindProducts()

  return (
    <div className="p-4 lg:p-6">
      <DataTable
        columns={columns}
        data={products}
        isLoading={isPending}
        filters={productFilters}
      />
    </div>
  )
}
