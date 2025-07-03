'use client'

import GenericTable from '@/common/components/generic table/GenericTable'
import React, { useEffect } from 'react'
import { empleadosTableColumns } from '@/common/lib/constants/empleadosTablesColumns'
import { useEmpleadoStore } from '@/store/storeEmpleados'

const Page = () => {
  const { empleados, fetchEmpleados, isLoading, error } = useEmpleadoStore()

  useEffect(() => {
    const getData = async () => {
      await fetchEmpleados()
    }
    getData()
  }, [])

  useEffect(() => {
    console.log(empleados)
  }, [empleados])

  return (
    <div>
      <GenericTable
        section="administracion"
        dataType="empleados"
        error={error}
        isLoading={isLoading}
        columns={empleadosTableColumns}
        data={empleados}
      />
    </div>
  )
}

export default Page
