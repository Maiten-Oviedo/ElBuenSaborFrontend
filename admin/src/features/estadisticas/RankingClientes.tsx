"use client"
// Movimientos.tsx

import React, { useEffect, useState } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import {bebidasTableColumns, clientesTableColumns } from '@/common/lib/constants/estadisticasTableColumns'
import { ICliente } from '@/common/types/entities/ICliente'


type Props = {
  dateRange: { startDate: Date; endDate: Date } | null
  clientesData: ICliente[]
}

export default function RankingClientes({ dateRange, clientesData }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div>
      <div>
        <p className="font-bold">
          {dateRange
            ? `Resultados para: ${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
            : 'Mostrando todos los registros'}
        </p>
      </div>

      {/* Tabla */}
      <GenericTable columns={clientesTableColumns} data={clientesData} error={error}
        isLoading={isLoading} dataType='ranking' />
    </div>
  )
}
