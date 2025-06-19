export interface CartItem {
  id: number
  denominacion: string
  descripcion?: string
  categoriaId?: number
  precioVenta: number
  imagen?: string
  cantidad: number
}
