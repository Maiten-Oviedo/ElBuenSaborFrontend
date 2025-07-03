'use client'
import { useEffect, useState } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { manufacturadosAdminTableColumns } from '@/common/lib/constants/adminTableColumns'

export default function Page() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAll = useStoreManufacturados(state => state.getAll)
  const data = useStoreManufacturados(state => state.data)
  console.log('DATA', data)
  const shouldRefresh = useStoreManufacturados(state => state.shouldRefresh)
  const setShouldRefresh = useStoreManufacturados(
    state => state.setShouldRefresh
  )

  useEffect(() => {
    const shouldFetch = shouldRefresh || data.length === 0
    if (!shouldFetch) return

    const fetchManufacturados = async () => {
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

    fetchManufacturados()
  }, [shouldRefresh, data.length])

  return (
    <div className="flex justify-center items-center mt-10">
      <GenericTable
        dataType="productos"
        columns={manufacturadosAdminTableColumns}
        data={data}
        isLoading={isLoading}
        error={error}
        section="administracion"
      />
    </div>
  )
}
