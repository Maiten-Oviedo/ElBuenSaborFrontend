import { create } from 'zustand'
import httpClient from '@/common/lib/httpClient'
import type { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'

interface ManufacturadosStore {
  data: IArticuloManufacturado[]

  isLoading: boolean
  error: string | null

  getAll: () => Promise<void>
  create: (item: IArticuloManufacturado) => Promise<void>
  update: (item: IArticuloManufacturado) => Promise<void>
  remove: (id: number) => Promise<void>
  shouldRefresh: boolean
  setShouldRefresh: (value: boolean) => void
}

export const useStoreManufacturados = create<ManufacturadosStore>(
  (set, get) => ({
    data: [],
    isLoading: false,
    error: null,

    getAll: async () => {
      set({ isLoading: true, error: null })
      try {
        const response = await httpClient().get(
          'http://localhost:8080/articulo-manufacturado/getAll'
        )
        set({
          data: response as IArticuloManufacturado[],
        })
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : 'Error desconocido',
        })
      } finally {
        set({ isLoading: false })
      }
    },

    create: async item => {
      try {
        const response = await httpClient().post(
          'http://localhost:8080/articulo-manufacturado',
          {
            body: JSON.stringify(item),
          }
        )
        set(state => ({
          data: [...state.data, response],
          shouldRefresh: true,
        }))
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : 'Error desconocido',
        })
        throw err
      }
    },

    update: async item => {
      try {
        const response = await httpClient().put(
          `http://localhost:8080/articulo-manufacturado/${item.id}`,
          {
            body: JSON.stringify(item),
          }
        )
        if (response.message === 'No Content') {
          throw new Error('El nombre del producto ya existe.')
        }
        set(state => ({
          data: state.data.map(m => (m.id === item.id ? { ...m, ...item } : m)),
          shouldRefresh: true,
        }))
      } catch (err: unknown) {
        set({
          error: err instanceof Error ? err.message : 'Error desconocido',
        })
        throw err
      }
    },

    remove: async id => {
      const previous = get().data.find(m => m.id === id)
      if (!previous) return

      const updatedItem = {
        ...previous,
        productoActivo: false,
        esVendible: false,
      }

      // Optimistic update local
      set(state => ({
        data: state.data.map(m => (m.id === id ? updatedItem : m)),
        shouldRefresh: true,
      }))

      try {
        await httpClient().put(
          `http://localhost:8080/articulo-manufacturado/${id}`,
          {
            body: JSON.stringify(updatedItem),
          }
        )
      } catch (err) {
        // Rollback
        set(state => ({
          data: state.data.map(m => (m.id === id ? previous : m)),
        }))
        set({
          error: err instanceof Error ? err.message : 'Error desconocido',
        })
        throw err
      }
    },
    shouldRefresh: false,
    setShouldRefresh: value => set(() => ({ shouldRefresh: value })),
  })
)
