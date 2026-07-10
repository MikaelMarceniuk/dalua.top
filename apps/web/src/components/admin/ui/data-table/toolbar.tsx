'use client'

import { Table } from '@tanstack/react-table'
import { IconLayoutColumns, IconChevronDown, IconX } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableFacetedFilter } from './faceted-filter'
import type { DataTableFilterConfig } from './types'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: DataTableFilterConfig[]
}

export function DataTableToolbar<TData>({
  table,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const column = table.getColumn(filter.columnId)

          if (filter.type === 'text') {
            return (
              <Input
                key={filter.columnId}
                placeholder={filter.placeholder ?? filter.title}
                value={(column?.getFilterValue() as string) ?? ''}
                onChange={(event) => column?.setFilterValue(event.target.value)}
                className="h-8 w-[180px] lg:w-[250px]"
              />
            )
          }

          return (
            <DataTableFacetedFilter
              key={filter.columnId}
              column={column}
              title={filter.title}
              options={filter.options}
              multiple={filter.multiple}
            />
          )
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Limpar
            <IconX />
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <IconLayoutColumns />
            Colunas
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => {
              const label =
                column.columnDef.meta?.label ??
                (typeof column.columnDef.header === 'string'
                  ? column.columnDef.header
                  : column.id)

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
