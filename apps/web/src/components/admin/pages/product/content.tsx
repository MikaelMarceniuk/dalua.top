'use client'

import { Product } from '@/components/admin/types/product.type'
import { DataTable } from '../../ui/data-table/data-table'
import {
  DataTableActionConfig,
  DataTableFilterConfig,
} from '../../ui/data-table/types'
import { columns } from './columns'
import { useFindProducts } from '@/components/admin/pages/product/hooks/use-find-products.hook'
import { IconPlus } from '@tabler/icons-react'
import { CreateProductDialog } from './create-product/create-product.dialog'
import { useState } from 'react'

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
  const [isCreateProductDialogOpen, setCreateProductDialogOpen] =
    useState(false)

  const actions: DataTableActionConfig<Product>[] = [
    {
      label: 'Criar novo',
      icon: IconPlus,
      onClick: () => setCreateProductDialogOpen(true),
    },
  ]

  return (
    <div className="p-4 lg:p-6">
      <DataTable
        columns={columns}
        data={products}
        isLoading={isPending}
        filters={productFilters}
        actions={actions}
      />

      <CreateProductDialog
        isOpen={isCreateProductDialogOpen}
        handleOpen={setCreateProductDialogOpen}
      />
    </div>
  )
}
