import '@tanstack/react-table'
import type { Table } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    label?: string
  }
}

export interface DataTableFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface BaseFilterConfig {
  columnId: string
  title: string
}

export interface DataTableTextFilterConfig extends BaseFilterConfig {
  type: 'text'
  placeholder?: string
}

export interface DataTableSelectFilterConfig extends BaseFilterConfig {
  type: 'select'
  options: DataTableFilterOption[]
  /** Permite selecionar múltiplos valores (checkbox). Default: true */
  multiple?: boolean
}

export interface DataTableActionConfig<TData> {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: (table: Table<TData>) => void | Promise<void>
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'
  /** Desabilita a ação condicionalmente (ex: precisa de linhas selecionadas) */
  disabled?: (table: Table<TData>) => boolean
}

export type DataTableFilterConfig =
  DataTableTextFilterConfig | DataTableSelectFilterConfig
