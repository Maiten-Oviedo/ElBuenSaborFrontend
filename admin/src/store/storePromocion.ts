import { create } from 'zustand'
import httpClient from '@/common/lib/httpClient'
import type { IArticuloPromocion } from '@/common/types/entities/IArticuloPromocion'

interface PromocionesStore {
  data: IArticuloPromocion[]
  isLoading: boolean
  error: string | null

  getAll: () => Promise<void>
  create: (item: IArticuloPromocion) => Promise<void>
  update: (item: IArticuloPromocion) => Promise<void>
  remove: (id: number) => Promise<void>

  shouldRefresh: boolean
  setShouldRefresh: (value: boolean) => void
}

export const useStorePromociones = create<PromocionesStore>((set, get) => ({
  data: [],
  isLoading: false,
  error: null,

  getAll: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await httpClient().get(
        'http://localhost:8080/articulo-promocion/getAll'
      )
      set({
        data: response as IArticuloPromocion[],
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
        'http://localhost:8080/articulo-promocion',
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
    const previous = get().data.find(p => p.id === item.id)

    set(state => ({
      data: state.data.map(p => (p.id === item.id ? { ...p, ...item } : p)),
      shouldRefresh: true,
    }))

    try {
      await httpClient().put(
        `http://localhost:8080/articulo-promocion/${item.id}`,
        {
          body: JSON.stringify(item),
        }
      )
    } catch (err) {
      if (previous) {
        set(state => ({
          data: state.data.map(p => (p.id === previous.id ? previous : p)),
        }))
      }
      set({
        error: err instanceof Error ? err.message : 'Error desconocido',
      })
      throw err
    }
  },

  remove: async id => {
    const previous = get().data.find(p => p.id === id)

    set(state => ({
      data: state.data.filter(p => p.id !== id),
    }))

    try {
      await httpClient().del(`http://localhost:8080/articulo-promocion/${id}`)
    } catch (err) {
      if (previous) {
        set(state => ({
          data: [...state.data, previous],
        }))
      }
      set({
        error: err instanceof Error ? err.message : 'Error desconocido',
      })
      throw err
    }
  },

  shouldRefresh: false,
  setShouldRefresh: value => set(() => ({ shouldRefresh: value })),
}))
