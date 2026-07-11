'use client'

import { useState } from 'react'
import { Table } from '@tanstack/react-table'
import { IconDots } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { DataTableActionConfig } from './types'

interface DataTableActionsProps<TData> {
  table: Table<TData>
  actions?: DataTableActionConfig<TData>[]
}

export function DataTableActions<TData>({
  table,
  actions = [],
}: DataTableActionsProps<TData>) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)

  if (actions.length === 0) return null

  async function handleClick(
    action: DataTableActionConfig<TData>,
    index: number
  ) {
    setLoadingIndex(index)
    try {
      await action.onClick(table)
    } finally {
      setLoadingIndex(null)
    }
  }

  // 1 ação só -> botão direto (menos clique, menos poluição visual)
  if (actions.length === 1) {
    const action = actions[0]
    const Icon = action.icon
    const isDisabled = action.disabled?.(table) ?? false

    return (
      <Button
        variant={action.variant ?? 'default'}
        size="sm"
        onClick={() => handleClick(action, 0)}
        disabled={isDisabled || loadingIndex === 0}
      >
        {Icon && <Icon />}
        {action.label}
      </Button>
    )
  }

  // múltiplas ações -> dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <IconDots />
          Ações
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {actions.map((action, index) => {
          const Icon = action.icon
          const isDisabled = action.disabled?.(table) ?? false

          return (
            <DropdownMenuItem
              key={action.label}
              variant={
                action.variant === 'destructive' ? 'destructive' : 'default'
              }
              disabled={isDisabled || loadingIndex === index}
              onClick={() => handleClick(action, index)}
            >
              {Icon && <Icon />}
              {action.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
