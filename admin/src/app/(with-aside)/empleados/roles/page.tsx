'use client'

import Button from '@/common/components/button/Button'
import GenericTable from '@/common/components/generic table/GenericTable'
import React, { useEffect, useState } from 'react'
import { rolesTableColumns } from '@/common/lib/constants/empleadosTablesColumns'
import httpClient from '@/common/lib/httpClient'
import { useEmpleadoStore } from '@/store/storeEmpleados'

type Props = {}

const Page = (props: Props) => {
  const { roles, fetchRoles, isLoading, error } = useEmpleadoStore()

  useEffect(() => {
    fetchRoles()
  }, [])

  return (
    <div>
      <GenericTable
        section='roles'
        dataType="empleados"
        error={error}
        isLoading={isLoading}
        columns={rolesTableColumns}
        data={roles}
      />
    </div>
  )
}

export default Page
