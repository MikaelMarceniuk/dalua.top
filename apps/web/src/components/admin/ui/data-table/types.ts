import '@tanstack/react-table'

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

export type DataTableFilterConfig =
  DataTableTextFilterConfig | DataTableSelectFilterConfig
