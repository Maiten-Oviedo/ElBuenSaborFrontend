import { ICliente } from '@/common/types/entities/ICliente'
import { create } from 'zustand'

interface ClientesStore {
  data: ICliente[]
  setData: (dataArray: ICliente[]) => void
  create: (clienteIn: ICliente) => void
  update: (clienteIn: ICliente) => void
  delete: (id: number) => void
  reactivate: (id: number) => void
  shouldRefresh: boolean
  setShouldRefresh: (value: boolean) => void
}

export const useStoreClientes = create<ClientesStore>()(set => ({
  data: [],

  setData: dataArray => set(() => ({ data: dataArray })),

  create: clienteIn =>
    set(state => ({ data: [...state.data, clienteIn], shouldRefresh: true })),

  update: clienteIn =>
    set(state => {
      const newData = state.data.map(cliente =>
        cliente.id === clienteIn.id ? { ...cliente, ...clienteIn } : cliente
      )
      return {
        data: newData,
        shouldRefresh: true,
      }
    }),

  delete: id =>
    set(state => {
      const newData = state.data.map(cliente =>
        cliente.id === id ? { ...cliente, activo: false } : cliente
      )
      return { data: newData, shouldRefresh: true }
    }),

  reactivate: id =>
    set(state => {
      const newData = state.data.map(cliente =>
        cliente.id === id ? { ...cliente, activo: true } : cliente
      )
      return { data: newData, shouldRefresh: true }
    }),

  shouldRefresh: false,
  setShouldRefresh: value => set(() => ({ shouldRefresh: value })),
}))
