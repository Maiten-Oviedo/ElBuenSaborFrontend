import { create } from 'zustand'
import httpClient from '@/common/lib/httpClient'
import type { IArticuloPromocion } from '@/common/types/entities/IArticuloPromocion'

interface PromocionesStore {
  data: IArticuloPromocion[]
  isLoading: boolean
  error: string | null

  getAll: () => Promise<void>
  create: (item: IArticuloPromocion) => Promise<void>
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
      const data = await httpClient().get(
        'http://localhost:8080/articulo-promocion/getAll'
      )
      set({ data }) // Aquí guardas los datos recibidos
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
      await get().getAll()

    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Error desconocido',
      })
      throw err
    } finally {
      set({ isLoading: false })
    }

  },


  remove: async id => {
    try {
      await httpClient().del(`http://localhost:8080/articulo-promocion/${id}`)
      await get().getAll()
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Error desconocido',
      })
      throw err
    } finally {
      set({ isLoading: false })
    }

  },

  shouldRefresh: false,
  setShouldRefresh: value => set(() => ({ shouldRefresh: value })),
}))
