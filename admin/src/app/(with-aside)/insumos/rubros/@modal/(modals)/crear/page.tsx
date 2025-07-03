'use client'

import MyForm from '@/common/components/form/MyForm'
import Modal from '@/common/components/modal/Modal'
import httpClient from '@/common/lib/httpClient'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  crearRubroFields,
  initialValuesCrearRubro,
} from '@/common/lib/constants/manufacturado'
import { crearRubroSchema } from '@/schemas/crearCatgoriasSchema'
import CategorySelector from '@/common/components/categoriaSelector/CategoriaSelector'
import { useStoreCategoriasInsumos } from '@/store/storeCategoriasInsumos'

interface CrearRubroValues {
  denominacion: string
  categoriaPadre: number | null | undefined
}

export default function CrearRubro() {
  const router = useRouter()
  const { data } = useStoreCategoriasInsumos()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  )
  const setShouldRefresh = useStoreCategoriasInsumos(
    state => state.setShouldRefresh
  )
  const [categoryError, setCategoryError] = useState<string>('')

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId)
    setCategoryError('')
  }

  const handleSubmit = async (values: CrearRubroValues) => {
    console.log('EJECUTANDO HANLDE SUBMIT')
    setError(null)
    setLoading(true)

    try {
      const body = {
        denominacion: values.denominacion,
        categoriaPadre: selectedCategoryId ?? null,
      }

      await httpClient().post('http://localhost:8080/categoria/crear', {
        body: JSON.stringify(body),
      })
      setShouldRefresh(true)
      router.back()
    } catch (error: unknown) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!data) {
    return (
      <Modal>
        <div className="text-center text-white">
          <h3 className="text-3xl font-extrabold mb-4">CREAR RUBRO</h3>
          <p>Cargando categorías...</p>
        </div>
      </Modal>
    )
  }

  return (
    <Modal>
      {/* Permitir scroll en el modal */}
      <div className="space-y-6 p-6">
        <h3 className="text-white text-3xl text-center font-extrabold">
          CREAR RUBRO
        </h3>

        {/* Selector de categoría padre */}
        <div className="flex justify-center">
          <CategorySelector
            categories={data}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
            label="Categoría Padre (Opcional)"
            placeholder="Seleccionar categoría padre o dejar vacío"
            error={categoryError}
          />
        </div>

        {/* Formulario principal */}
        <MyForm
          initialValues={initialValuesCrearRubro}
          fields={crearRubroFields}
          onSubmit={values => handleSubmit(values)}
          textLeftButton="Cancelar"
          textButton="Crear Rubro"
          validationSchema={crearRubroSchema}
          loading={loading}
          error={error}
          onLeftButtonClick={() => router.back()}
          designInOneColumn
        />

        {/* Información adicional */}
        <div className="text-center text-gray-300 text-sm">
          <p>
            💡 Puedes crear un rubro sin categoría padre para que sea un rubro
            principal
          </p>
          <p>
            🎯 Ahora puedes seleccionar cualquier categoría, tenga o no
            subcategorías
          </p>
        </div>
      </div>
    </Modal>
  )
}
