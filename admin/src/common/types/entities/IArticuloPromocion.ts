import { IPromocionDetalle } from "./IPromocionDetalle"

export interface IArticuloPromocion {
  id: number
  denominacion: string
  precioVenta: number
  productoActivo: boolean
  tiempoEstimadoMinutos: number
  precioCosto: number
  imagenesUrls: { id: number; url: string }[]
  categoriaId: number
  categoriaDenominacion: string
  fechaDesde: string
  fechaHasta: string
  horaDesde: string
  horaHasta: string
  descripcionDescuento: string
  precioPromocional: number
  promocionDetalle: [IPromocionDetalle]
}
