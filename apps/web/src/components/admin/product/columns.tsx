'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { ProductActionsCell } from './product-actions.cell'
import { Product } from '@/components/admin/types/product.type'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { label: 'Nome' },
    size: 300,
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'priceInCents',
    header: () => <div className="w-full">Preço</div>,
    meta: { label: 'Preço' },
    size: 120,
    cell: ({ row }) => (
      <div className="tabular-nums">
        {formatCurrency(row.original.priceInCents)}
      </div>
    ),
  },
  {
    accessorKey: 'isAvailableForPurchase',
    header: 'Status',
    meta: { label: 'Status' },
    size: 140,
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.isAvailableForPurchase
            ? 'product-available'
            : 'product-unavailable'
        }
      >
        {row.original.isAvailableForPurchase ? 'Disponível' : 'Indisponível'}
      </Badge>
    ),
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true
      return filterValue.includes(String(row.getValue(columnId)))
    },
  },
  {
    id: 'actions',
    size: 20,
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
    enableHiding: false,
  },
]
