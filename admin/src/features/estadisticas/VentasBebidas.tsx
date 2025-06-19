"use client"
// Movimientos.tsx

import React, { useEffect, useState } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import {bebidasTableColumns } from '@/common/lib/constants/estadisticasTableColumns'

type Plato = {
  denominacion: string
  cantidadTotal: number
  totalRecaudado: number
}

type Props = {
  dateRange: { startDate: Date; endDate: Date } | null
  bebidasData: Plato[]
}

export default function VentasBebidas({ dateRange, bebidasData }: Props) {
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
      <GenericTable columns={bebidasTableColumns} data={bebidasData} error={error}
        isLoading={isLoading} dataType='ranking' />
    </div>
  )
}
