'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { ProductActionsCell } from './product-actions.cell'

export type Product = {
  id: string
  name: string
  priceInCents: number
  isAvailableForPurchase: boolean
  hasOrders: boolean
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { label: 'Nome' },
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'priceInCents',
    header: () => <div className="w-full text-right">Preço</div>,
    meta: { label: 'Preço' },
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatCurrency(row.original.priceInCents)}
      </div>
    ),
  },
  {
    accessorKey: 'isAvailableForPurchase',
    header: 'Status',
    meta: { label: 'Status' },
    cell: ({ row }) => (
      <Badge
        variant={row.original.isAvailableForPurchase ? 'default' : 'outline'}
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
    cell: ({ row }) => <ProductActionsCell product={row.original} />,
    enableHiding: false,
  },
]
