export interface ICategoria {
  id?: number
  denominacion: string
  //relaciones
  categoriaPadre?: number
  categoriaPadreDenominacion?: string
  subcategorias?: ICategoria[]
}
