import type { ICategoria } from '../types/entities/ICategoria'

export function organizeCategoriesByType(categories: ICategoria[]) {
  const categoriesMap = new Map<number, ICategoria>()

  // Crear un mapa para búsqueda rápida de denominaciones por ID
  const denominationMap = new Map<number, string>()
  categories.forEach(category => {
    if (category.id) {
      denominationMap.set(category.id, category.denominacion)
    }
  })

  // Crear el mapa de categorías con subcategorias vacías y categoriaPadreDenominacion
  categories.forEach(category => {
    let categoriaPadreDenominacion: string | undefined = undefined

    // Si tiene categoría padre, buscar su denominación
    if (category.categoriaPadre) {
      categoriaPadreDenominacion = denominationMap.get(category.categoriaPadre)
    }

    categoriesMap.set(category.id!, {
      ...category,
      categoriaPadreDenominacion,
      subcategorias: [],
    })
  })

  const manufacturadoRoot = categoriesMap.get(1)
  const insumoRoot = categoriesMap.get(2)

  const categoriesManufacturados: ICategoria[] = []
  const categoriesInsumos: ICategoria[] = []

  function buildCategoryTree(categoryId: number): ICategoria | undefined {
    const category = categoriesMap.get(categoryId)
    if (!category) return undefined

    categories.forEach(item => {
      if (item.categoriaPadre === categoryId) {
        const subcategory = buildCategoryTree(item.id!)
        if (subcategory && category.subcategorias) {
          category.subcategorias.push(subcategory)
        }
      }
    })

    return category
  }

  if (manufacturadoRoot) {
    const manufacturadoTree = buildCategoryTree(1)
    if (manufacturadoTree) {
      categoriesManufacturados.push(manufacturadoTree)

      function addAllSubcategories(
        category: ICategoria,
        targetArray: ICategoria[]
      ) {
        if (category.subcategorias) {
          category.subcategorias.forEach(subcategory => {
            targetArray.push(subcategory)
            addAllSubcategories(subcategory, targetArray)
          })
        }
      }

      addAllSubcategories(manufacturadoTree, categoriesManufacturados)
    }
  }

  if (insumoRoot) {
    const insumoTree = buildCategoryTree(2)
    if (insumoTree) {
      categoriesInsumos.push(insumoTree)

      function addAllSubcategories(
        category: ICategoria,
        targetArray: ICategoria[]
      ) {
        if (category.subcategorias) {
          category.subcategorias.forEach(subcategory => {
            targetArray.push(subcategory)
            addAllSubcategories(subcategory, targetArray)
          })
        }
      }

      addAllSubcategories(insumoTree, categoriesInsumos)
    }
  }

  categoriesManufacturados.sort((a, b) => a.categoriaPadre! - b.categoriaPadre!)
  categoriesInsumos.sort((a, b) => a.categoriaPadre! - b.categoriaPadre!)

  console.log('MANUFACTURADOS: ', categoriesManufacturados)
  console.log('INSUMOS: ', categoriesInsumos)

  return {
    categoriesManufacturados,
    categoriesInsumos,
  }
}

/**
 * Versión alternativa que devuelve arrays planos con categoriaPadreDenominacion
 */
export function getCategoriesByType(categories: ICategoria[]) {
  const categoriesManufacturados: ICategoria[] = []
  const categoriesInsumos: ICategoria[] = []

  // Crear un mapa para búsqueda rápida de denominaciones por ID
  const denominationMap = new Map<number, string>()
  categories.forEach(category => {
    if (category.id) {
      denominationMap.set(category.id, category.denominacion)
    }
  })

  // Función para enriquecer una categoría con categoriaPadreDenominacion
  function enrichCategory(category: ICategoria): ICategoria {
    let categoriaPadreDenominacion: string | undefined = undefined

    if (category.categoriaPadre) {
      categoriaPadreDenominacion = denominationMap.get(category.categoriaPadre)
    }

    return {
      ...category,
      categoriaPadreDenominacion,
    }
  }

  // Función recursiva para encontrar todas las categorías descendientes de un ID
  function findDescendants(parentId: number, targetArray: ICategoria[]) {
    // Encontrar categorías directas
    const directChildren = categories.filter(
      cat => cat.categoriaPadre === parentId
    )

    // Añadir cada categoría encontrada al array objetivo con categoriaPadreDenominacion
    directChildren.forEach(child => {
      targetArray.push(enrichCategory(child))
      // Buscar recursivamente los descendientes de esta categoría
      findDescendants(child.id!, targetArray)
    })
  }

  // Añadir la categoría raíz de Manufacturado y todos sus descendientes
  const manufacturadoRoot = categories.find(cat => cat.id === 1)
  if (manufacturadoRoot) {
    categoriesManufacturados.push(enrichCategory(manufacturadoRoot))
    findDescendants(1, categoriesManufacturados)
  }

  // Añadir la categoría raíz de Insumo y todos sus descendientes
  const insumoRoot = categories.find(cat => cat.id === 2)
  if (insumoRoot) {
    categoriesInsumos.push(enrichCategory(insumoRoot))
    findDescendants(2, categoriesInsumos)
  }

  return {
    categoriesManufacturados,
    categoriesInsumos,
  }
}
