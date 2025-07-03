import { IPromocionDetalle } from "./IPromocionDetalle"

export interface IArticuloPromocion {
  id: number
  denominacion: string
  descripcion: string
  precioVenta: number
  precioTotal: number
  productoActivo: boolean
  tiempoEstimadoMinutos: number
  imagenesUrls: { id: number; url: string }[]
  categoriaId: number
  fechaDesde: string
  fechaHasta: string
  horaDesde: string
  horaHasta: string
  categoriaDenominacion?: string
  promocionDetalle: [IPromocionDetalle]
}
