'use client'
import { useEffect, useState } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import { useStorePromociones } from '@/store/storePromocion'
import { promocionTableColumns } from '@/common/lib/constants/promocionTableColumns'

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAll = useStorePromociones(state => state.getAll)
  const data = useStorePromociones(state => state.data)
  const shouldRefresh = useStorePromociones(state => state.shouldRefresh)
  const setShouldRefresh = useStorePromociones(
    state => state.setShouldRefresh
  )

  useEffect(() => {
    const shouldFetch = shouldRefresh || data.length === 0
    if (!shouldFetch) return

    const fetchPromociones = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await getAll()
      } catch (error: unknown) {
        setError(`Error al traer la información actualizada. ${error}`)
      } finally {
        setIsLoading(false)
        setShouldRefresh(false)
      }
    }

    fetchPromociones()
  }, [shouldRefresh, data.length])

  return (
    <div className="flex justify-center items-center mt-10">
      <GenericTable
        dataType="productos"
        columns={promocionTableColumns}
        data={data}
        isLoading={isLoading}
        error={error}
        section="promociones"
      />
    </div>
  )
}
