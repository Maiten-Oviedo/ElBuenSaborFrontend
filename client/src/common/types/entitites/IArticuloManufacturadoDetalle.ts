export interface IArticuloManufacturadoDetalle {
  id?: number
  cantidad: number
  //relaciones
  // articuloManufacturado: IArticuloManufacturado; comentado porque por ahora la relación esta en IArticuloManufacturado
  articuloInsumoId: number
  articuloDenominacion: string
}
