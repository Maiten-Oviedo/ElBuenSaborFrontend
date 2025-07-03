'use client'

import MyForm from '@/common/components/form/MyForm'
import Modal from '@/common/components/modal/Modal'
import httpClient from '@/common/lib/httpClient'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { FormikHelpers } from 'formik'
import type { ICategoria } from '@/common/types/entities/ICategoria'
import {
  crearRubroFields,
  getInitialValuesEditarRubro,
} from '@/common/lib/constants/manufacturado'
import { editarRubroSchema } from '@/schemas/crearCatgoriasSchema'
import CategorySelector from '@/common/components/categoriaSelector/CategoriaSelector'
import { useStoreCategoriasInsumos } from '@/store/storeCategoriasInsumos'

interface EditarRubroValues {
  denominacion: string
  categoriaPadre: number | null | undefined
}

export default function EditarRubro() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const { data: categorias, getCategoriaById } = useStoreCategoriasInsumos()
  const setShouldRefresh = useStoreCategoriasInsumos(
    state => state.setShouldRefresh
  )

  const [categoria, setCategoria] = useState<ICategoria | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const [categoryError, setCategoryError] = useState<string>('')
  const [initialValues, setInitialValues] = useState<EditarRubroValues>({
    denominacion: '',
    categoriaPadre: null,
  })
  const [isInitialLoad, setIsInitialLoad] = useState(true) // Flag para controlar la carga inicial

  // Función para verificar si una categoría es descendiente de otra (evitar ciclos)
  const isDescendant = (
    potentialParentId: number,
    categoryId: number
  ): boolean => {
    const findDescendants = (parentId: number): number[] => {
      const children = categorias.filter(cat => cat.categoriaPadre === parentId)
      let descendants = children
        .map(child => child.id!)
        .filter(id => id !== undefined)

      children.forEach(child => {
        descendants = [...descendants, ...findDescendants(child.id!)]
      })

      return descendants
    }

    const descendants = findDescendants(categoryId)
    return descendants.includes(potentialParentId)
  }

  // Cargar datos de la categoría a editar
  useEffect(() => {
    const loadCategoria = async () => {
      if (id && !Array.isArray(id)) {
        const categoriaData = await getCategoriaById(Number(id))
        if (categoriaData) {
          setCategoria(categoriaData)
          // Solo establecer la categoría padre inicial si es la primera carga
          if (isInitialLoad) {
            setSelectedCategoryId(categoriaData.categoriaPadre || null)
            setIsInitialLoad(false)
          }
          setInitialValues(getInitialValuesEditarRubro(categoriaData))
        } else {
          setError('No se pudo cargar la categoría')
        }
      }
    }

    loadCategoria()
  }, [id, getCategoriaById, isInitialLoad])

  const handleCategorySelect = (categoryId: number | null) => {
    // Limpiar errores previos
    setCategoryError('')

    // Validar que no se seleccione a sí misma
    if (categoryId === Number(id)) {
      setCategoryError('Una categoría no puede ser padre de sí misma')
      return
    }

    // Validar que no se cree un ciclo (que la categoría no sea padre de uno de sus ancestros)
    if (categoryId && isDescendant(categoryId, Number(id))) {
      setCategoryError(
        'No se puede seleccionar una subcategoría como padre (crearía un ciclo)'
      )
      return
    }

    // Si todas las validaciones pasan, actualizar la selección
    setSelectedCategoryId(categoryId)
  }

  const handleSubmit = async (values: EditarRubroValues) => {
    setError(null)
    setLoading(true)

    try {
      const body = {
        denominacion: values.denominacion,
        categoriaPadre: selectedCategoryId ?? null,
      }

      await httpClient().put(
        `http://localhost:8080/categoria/actualizar/${id}`,
        {
          body: JSON.stringify(body),
        }
      )

      setShouldRefresh(true)
      router.back()
    } catch (error: unknown) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // Filtrar categorías para excluir la actual y sus descendientes
  const availableCategories = categorias.filter(cat => {
    // Excluir la categoría actual
    if (cat.id === Number(id)) return false

    // Excluir descendientes para evitar ciclos
    if (isDescendant(cat.id!, Number(id))) return false

    return true
  })

  return (
    <Modal>
      <div className="space-y-6 p-6">
        <h3 className="text-white text-3xl text-center font-extrabold">
          EDITAR RUBRO: {categoria?.denominacion}
        </h3>
        {categoria?.categoriaPadreDenominacion && (
          <p className="my-2 p-2 bg-green-100 rounded  text-green-800 flex w-max m-auto gap-2">
            Rubro Padre actual:
            <strong className="block text-green-600">
              {categoria.categoriaPadreDenominacion}
            </strong>
          </p>
        )}
        {/* Selector de categoría padre */}
        <div className="flex justify-center">
          <CategorySelector
            categories={availableCategories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
            label="Nuevo Rubro Padre (Opcional)"
            placeholder="Seleccionar un rubro padre o dejar vacío"
            error={categoryError}
          />
        </div>

        {/* Formulario principal */}
        <MyForm
          initialValues={initialValues}
          fields={crearRubroFields}
          onSubmit={handleSubmit}
          textLeftButton="Cancelar"
          textButton="Guardar Cambios"
          validationSchema={editarRubroSchema}
          loading={loading}
          error={error}
          onLeftButtonClick={() => router.back()}
          designInOneColumn
        />

        {/* Información adicional */}
        <div className="text-center text-gray-300 text-sm space-y-2">
          <p>🔍 No selecciones Rubro para que sea un Rubro Padre</p>
        </div>
      </div>
    </Modal>
  )
}
