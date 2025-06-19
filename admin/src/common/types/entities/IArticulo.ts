import { IImagenArticulo } from './IImagenArticulo'

export interface IArticulo {
  id?: number
  denominacion: string
  precioVenta: number
  productoActivo: boolean
  tiempoEstimadoMinutos: number
  //relaciones
  imagenesUrls?: IImagenArticulo[] | []
  categoriaId: number
}
