import { ICategoria } from '@/common/types/entities/ICategoria'
import { create } from 'zustand'

interface CategoriasStore {
  data: ICategoria[]
  subcategorias: ICategoria[][]
  setCategoriesInsumos: (dataArray: ICategoria[]) => void
  setSubcategorias: (subcategoriasArray: ICategoria[][]) => void
  updateSubcategoriasByNivel: (nivel: number, data: ICategoria[]) => void

  createCategoria: (categoria: ICategoria) => void
  updateCategoria: (categoria: ICategoria) => void
  deleteCategoria: (id: number) => void
}

export const useStoreCategoriasInsumos = create<CategoriasStore>()(set => ({
  data: [],
  subcategorias: [],

  setCategoriesInsumos: dataArray => set(() => ({ data: dataArray })),

  setSubcategorias: subcategoriasArray =>
    set(() => ({ subcategorias: subcategoriasArray })),

  updateSubcategoriasByNivel: (nivel, newData) =>
    set(state => {
      const newSubcategorias = [...state.subcategorias]
      newSubcategorias[nivel] = newData
      return { subcategorias: newSubcategorias.slice(0, nivel + 1) } // elimina los niveles siguientes de subcategorías si el select padre se cambia
    }),

  createCategoria: categoria =>
    set(state => ({ data: [...state.data, categoria] })),

  updateCategoria: categoriaIn =>
    set(state => {
      const newData = state.data.map(categoria =>
        categoria.id === categoriaIn.id
          ? { ...categoria, ...categoriaIn }
          : categoria
      )
      return { data: newData }
    }),

  deleteCategoria: id =>
    set(state => {
      const newData = state.data.filter(categoria => categoria.id !== id)
      return { data: newData }
    }),
}))
