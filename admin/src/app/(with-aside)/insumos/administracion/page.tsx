'use client'
import GenericTable from '@/common/components/generic table/GenericTable'
import { insumosAdminTableColumns } from '@/common/lib/constants/adminTableColumns'
import { useInsumos } from '@/common/hooks/useInsumos'
import { useState, useEffect } from 'react'
import { useStoreCategoriasInsumos } from '@/store/storeCategoriasInsumos'
import { useStoreCategoriasManufacturados } from '@/store/storeCategoriasManufacturados'

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const setCategoriesInsumos = useStoreCategoriasInsumos(
    state => state.setCategoriesInsumos
  )
  const fetchAndSetCategorias = useStoreCategoriasManufacturados(
    state => state.fetchAndSetCategorias
  )
  const { getInsumos, data } = useInsumos()

  // ===== useEffect que trae todas las tareas cada vez que se actualiza =====
  useEffect(() => {
    const fetchInsumos = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const result = await fetchAndSetCategorias(setCategoriesInsumos)
        if (!result.success) setError(result.error || 'Error desconocido')
        await getInsumos()
      } catch (e: unknown) {
        setError(
          `Error al traer la información actualizada. ${(e as Error).message}`
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsumos()
  }, [])

  return (
    <div className="flex justify-center items-center mt-10">
      <GenericTable
        section="administracion"
        dataType="insumos"
        columns={insumosAdminTableColumns}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
