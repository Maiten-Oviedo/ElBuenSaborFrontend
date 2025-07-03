export interface IGenericTableProps<T> {
  dataType: string
  columns: ITableColumn<T>[]
  data: any[]
  isLoading: boolean
  error: string | null
  section?: string
  esEstadistica?: boolean
}

export interface ITableColumn<T> {
  label: string
  key: string
  render?: (row: T) => React.ReactNode
  Cell?: (props: { row: T }) => React.ReactNode // ← NUEVO soporte para formatear Arrays
}
