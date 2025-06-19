export interface ICategoria {
  id?: number
  denominacion: string
  categoriaPadre?: number
  categoriaPadreDenominacion?: string
  subcategorias?: ICategoria[]
}
