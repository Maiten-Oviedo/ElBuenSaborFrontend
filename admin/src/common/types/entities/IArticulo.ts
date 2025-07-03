import { IImagenArticulo } from './IImagenArticulo'

export interface IArticulo {
  id?: number
  denominacion: string
  precioVenta: number
  productoActivo: boolean
  tiempoEstimadoMinutos: number
  margen: number | null
  //relaciones
  imagenesUrls?: IImagenArticulo[] | string[]
  categoriaId: number
}
