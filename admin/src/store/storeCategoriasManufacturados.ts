import httpClient from '@/common/lib/httpClient'
import { ICategoria } from '@/common/types/entities/ICategoria'
import { organizeCategoriesByType } from '@/common/utils/orderCatgories'
import { create } from 'zustand'

// Constante para la clave en localStorage
const LS_KEY = 'categorias-manufacturados'

interface CategoriasStore {
  data: ICategoria[]
  subcategorias: ICategoria[][]
  setCategoriesManufacturados: (dataArray: ICategoria[]) => void
  setSubcategorias: (subcategoriasArray: ICategoria[][]) => void
  updateSubcategoriasByNivel: (nivel: number, data: ICategoria[]) => void
  createCategoria: (categoria: ICategoria) => void
  updateCategoria: (categoria: ICategoria) => void
  deleteCategoria: (id: number) => Promise<void>
  getCategoriaById: (id: number) => ICategoria | null
  fetchAndSetCategorias: (
    setCategoriesInsumos: (data: ICategoria[]) => void
  ) => Promise<{ success: boolean; error?: string }>
  shouldRefresh: boolean
  setShouldRefresh: (value: boolean) => void
}

const loadFromLocalStorage = (): ICategoria[] => {
  try {
    const data = localStorage.getItem(LS_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

const saveToLocalStorage = (data: ICategoria[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Error guardando categorías en localStorage', e)
  }
}

export const useStoreCategoriasManufacturados = create<CategoriasStore>()(
  (set, get) => ({
    data: loadFromLocalStorage(),
    subcategorias: [],

    setCategoriesManufacturados: dataArray => {
      saveToLocalStorage(dataArray)
      set({ data: dataArray })
    },

    getCategoriaById: id => {
      const categoria = get().data.find(cat => cat.id === id) || null
      return categoria
    },

    fetchAndSetCategorias: async (
      setCategoriesInsumos: (data: ICategoria[]) => void
    ) => {
      try {
        const response = (await httpClient().get(
          'http://localhost:8080/categoria/getAll'
        )) as ICategoria[]

        if (!response) throw new Error('No se encontraron Rubros.')

        const categories = organizeCategoriesByType(response)

        // Guardar en ambos stores y en localStorage
        saveToLocalStorage(categories.categoriesManufacturados)
        set({ data: categories.categoriesManufacturados })
        setCategoriesInsumos(categories.categoriesInsumos)

        return { success: true }
      } catch (error: unknown) {
        return { success: false, error: (error as Error).message }
      }
    },

    setSubcategorias: subcategoriasArray =>
      set(() => ({ subcategorias: subcategoriasArray })),

    updateSubcategoriasByNivel: (nivel, newData) =>
      set(state => {
        const newSubcategorias = [...state.subcategorias]
        newSubcategorias[nivel] = newData
        return { subcategorias: newSubcategorias.slice(0, nivel + 1) }
      }),

    createCategoria: categoria =>
      set(state => {
        const newData = [...state.data, categoria]
        saveToLocalStorage(newData)
        return { data: newData }
      }),

    updateCategoria: categoriaIn =>
      set(state => {
        const newData = state.data.map(categoria =>
          categoria.id === categoriaIn.id
            ? { ...categoria, ...categoriaIn }
            : categoria
        )
        saveToLocalStorage(newData)
        return { data: newData }
      }),

    deleteCategoria: async id => {
      await httpClient()
        .del(`http://localhost:8080/categoria/delete/${id}`)
        .then(() => {
          set(state => {
            const newData = state.data.filter(categoria => categoria.id !== id)
            saveToLocalStorage(newData)
            return { data: newData }
          })
        })
        .catch(error => {
          throw new Error(`Error al eliminar la categoría: ${error.message}`)
        })
    },
    shouldRefresh: false,
    setShouldRefresh: value => set(() => ({ shouldRefresh: value })),
  })
)
