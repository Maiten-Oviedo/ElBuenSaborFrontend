'use client'
import GenericTable from '@/common/components/generic table/GenericTable'
import { useClientes } from '@/common/hooks/useClientes'
import { clientesAdminTableColumns } from '@/common/lib/constants/adminTableColumns'
import { useStoreClientes } from '@/store/storeClientes'
import React, { useEffect, useState } from 'react'

const Clientes = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const data = useStoreClientes(state => state.data)
  const shouldRefresh = useStoreClientes(state => state.shouldRefresh)
  const { getClientes } = useClientes()

  useEffect(() => {
    const fetchClientes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await getClientes()
      } catch (error: unknown) {
        setError(`Error al traer la información actualizada. ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientes()
  }, [data.length, shouldRefresh])

  return (
    <GenericTable
      dataType="clientes"
      columns={clientesAdminTableColumns}
      data={data}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default Clientes
