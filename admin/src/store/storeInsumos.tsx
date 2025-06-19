import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { create } from 'zustand'

interface InsumosStore {
  data: IArticuloInsumo[]
  setData: (dataArray: IArticuloInsumo[]) => void
  createInsumo: (insumo: IArticuloInsumo) => void
  updateInsumo: (insumo: IArticuloInsumo) => void
  deleteInsumo: (id: number) => void
  comprarInsumo:(id: number, stockActual: number, nuevoStock: number, precioCompra: number) => void
}

export const useStoreInsumos = create<InsumosStore>()(set => ({
  data: [],

  setData: dataArray => set(() => ({ data: dataArray })),

  createInsumo: insumo => set(state => ({ data: [...state.data, insumo] })),

  updateInsumo: insumoIn =>
    set(state => {
      const newData = state.data.map(insumo =>
        insumo.id === insumoIn.id ? { ...insumo, ...insumoIn } : insumo
      )
      return { data: newData }
    }),

  deleteInsumo: id =>
    set(state => {
      const newData = state.data.filter(insumo => insumo.id !== id)
      return { data: newData }
    }),

      comprarInsumo: (id, stockActual, nuevoStock, precioCompra) =>
    set(state => {
      const newData = state.data.map(insumo =>
        insumo.id === id
          ? {
              ...insumo,
              stock: stockActual + nuevoStock,
              precioCompra: precioCompra
            }
          : insumo
      )
      return { data: newData }
    })

}))
