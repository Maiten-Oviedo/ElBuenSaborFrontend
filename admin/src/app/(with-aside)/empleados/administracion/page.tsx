"use client";

import Button from '@/common/components/button/Button'
import GenericTable from '@/common/components/generic table/GenericTable'
import React, { useEffect, useState } from 'react'
import type { IEmpleado } from '@/common/types/entities/IEmpleado';
import { empleadosTableColumns } from '@/common/lib/constants/empleadosTablesColumns';
type Props = {}

const Page = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [empleados, setEmpleados] = useState<IEmpleado[]>([])
  
  useEffect(() => {
    fetch('http://localhost:8080/empleados')
      .then(response => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
      })
      .then(data => setEmpleados(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  console.log("empleados" , empleados)

  if (isLoading) return <p>Cargando productos...</p>;

  return (
    <div>
      <GenericTable
        section='administracion'
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