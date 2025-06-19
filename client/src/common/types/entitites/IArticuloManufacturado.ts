import { IArticulo } from './IArticulo'
import { IArticuloManufacturadoDetalle } from './IArticuloManufacturadoDetalle'

export interface IArticuloManufacturado extends IArticulo {
  descripcion: string
  precioCosto: number
  articuloManufacturadoDetalle: IArticuloManufacturadoDetalle[]
}

// Articulo:
//
//   id?: number
//   denominacion: string
//   precioVenta: number
//   productoActivo: boolean
//   tiempoEstimadoMinutos: number
//   //relaciones
//   imagenesUrls?: IImagenArticulo[] | []
//   categoriaId: number
//   categoriaDenominacion?: string