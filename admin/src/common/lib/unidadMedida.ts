export const unidadMedidaEnumArray = ['UNIDAD', 'GR', 'ML', 'L', 'KG'] as const

export type UnidadMedidaEnum = (typeof unidadMedidaEnumArray)[number]
