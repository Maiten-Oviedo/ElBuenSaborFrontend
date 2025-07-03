import { ProductoCombo } from "@/common/types/entities/IProductoCombo"
import { FormField } from "@/common/types/form.types"

const rawFields = [
  { name: 'denominacion', label: 'Denominación', type: 'text' },
  { name: 'categoriaId', label: 'Categoría', type: 'select' },
  { name: 'descripcion', label: 'Descripción', type: 'text' },
  { name: 'fechaDesde', label: 'Fecha Desde', type: 'date' },
  { name: 'horaDesde', label: 'Hora Desde', type: 'time' },
  { name: 'fechaHasta', label: 'Fecha Hasta', type: 'date' },
  { name: 'horaHasta', label: 'Hora Hasta', type: 'time' },
  { name: 'precioVenta', label: 'Precio promocional', type: 'number' },
] as const

export const fields: FormField[] = [...rawFields]


export const initialValues = {
  denominacion: " ",
  descripcion: " ",
  imagenesUrls: [],
  categoriaId: 0,
  precioVenta: 0,
  esVendible: false,
  productoActivo: false,
  horaDesde: " ",
  horaHasta: " ",
  fechaDesde: " ",
  fechaHasta: " ",
  margen: null,
  productosSeleccionados: [] as ProductoCombo[],
}

export interface FormValues {
  denominacion: string
  descripcion: string
  imagenesUrls: { id?: number | null; url: string }[]
  categoriaId: number
  precioVenta: number
  esVendible: boolean
  productoActivo: boolean
  horaDesde: string
  horaHasta: string
  fechaDesde: string
  fechaHasta: string
  margen: number | null
  productosSeleccionados: ProductoCombo[]
}
