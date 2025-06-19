export type FiltroMenu =
  | 'TODO'
  | 'HAMBURGUESAS'
  | 'SIDES'
  | 'BEBIDAS'
  | 'PROMOS'

export const categoriaMap: Record<FiltroMenu, number | number[] | null> = {
  TODO: null,
  HAMBURGUESAS: 3,
  SIDES: 16,
  BEBIDAS: [11, 12, 13, 14, 15],
  PROMOS: [17, 18, 19],
}

export const idCategoriaMap: Record<number, string> = {
  3: 'HAMBURGUESAS',
  16: 'SIDES',
  11: 'BEBIDAS',
  12: 'BEBIDAS',
  13: 'BEBIDAS',
  14: 'BEBIDAS',
  15: 'BEBIDAS',
  17: 'PROMOS',
  18: 'PROMOS',
  19: 'PROMOS',
}

export const getRubroByCategoriaId = (categoriaId: number): string => {
  return idCategoriaMap[categoriaId] || 'Sin categoría'
}
