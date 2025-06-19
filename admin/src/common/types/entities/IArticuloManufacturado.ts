import { IArticulo } from './IArticulo'
import { IArticuloManufacturadoDetalle } from './IManufacturadoDetalle'

export interface IArticuloManufacturado extends IArticulo {
  categoriaDenominacion?: string
  descripcion: string
  precioCosto: number
  esVendible: boolean
  articuloManufacturadoDetalle: IArticuloManufacturadoDetalle[]
}
