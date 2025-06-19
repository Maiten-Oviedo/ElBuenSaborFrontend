"use client";

import Button from '@/common/components/button/Button'
import GenericTable from '@/common/components/generic table/GenericTable'
import React, { useState } from 'react'
import { rolesTableColumns } from '@/common/lib/constants/empleadosTablesColumns'
import { Roles } from "../../../../../public/assets/Data/roles"
type Props = {}

const Page = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // ACA IRIAN LOS FETCHS


  return (
    <div>
      <GenericTable
        section='roles'
        dataType="empleados"
        error={error}
        isLoading={isLoading}
        columns={rolesTableColumns}
        data={Roles}
      />
    </div>
  )
}

export default Page