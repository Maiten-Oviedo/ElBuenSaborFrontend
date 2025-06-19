export interface Producto {
  id?: number
  denominacion: string
  descripcion: string
  categoriaId: number
  precioVenta: number
  imagenesUrls?: string[]
  productoActivo: boolean
  //relaciones
  categoriaDenominacion?: string
}
