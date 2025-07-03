import { Producto } from './Producto'

export type FiltroMenu =
  | 'TODO'
  | 'HAMBURGUESAS'
  | 'SIDES'
  | 'BEBIDAS'
  | 'PROMOS'
  | 'OTROS'

export const filtrarPorMenu = (
  filtro: FiltroMenu,
  producto: Producto
): boolean => {
  const padre = producto.categoriaPadre?.toUpperCase()
  const denominacion = producto.categoriaDenominacion?.toUpperCase()

  switch (filtro) {
    case 'TODO':
      return true

    case 'HAMBURGUESAS':
      return padre === 'MANUFACTURADO' && denominacion === 'HAMBURGUESAS'

    case 'SIDES':
      return padre === 'MANUFACTURADO' && denominacion === 'SIDES'

    case 'BEBIDAS':
      return padre === 'BEBIDAS'

    case 'PROMOS':
      return padre === 'COMBOS'
    //En caso de que se quiera poner el Filtro por Otros
    case 'OTROS':
      return (
        padre !== 'MANUFACTURADO' && padre !== 'BEBIDAS' && padre !== 'COMBOS'
      )
    default:
      return true
  }
}
