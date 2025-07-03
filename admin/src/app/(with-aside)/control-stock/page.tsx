'use client'
import GenericTable from '@/common/components/generic table/GenericTable'
import { controlStockTableColumns } from '@/common/lib/constants/adminTableColumns'
import httpClient from '@/common/lib/httpClient'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ControlStock = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<IArticuloInsumo[]>([])

  useEffect(() => {
    const fetchInsumosBajoStock = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await httpClient().get(
          'http://localhost:8080/articulo-insumo/bajo-stock/getAll'
        )

        setData(response)
      } catch (error: unknown) {
        setError(`Error al traer la información actualizada. ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsumosBajoStock()
  }, [data.length])

  return (
    <div className="w-full h-full">
      {data && data.length > 0 ? (
        <GenericTable
          dataType="control-stock"
          columns={controlStockTableColumns}
          data={data}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <p className="font-semibold">
            ¡Genial! No tienes insumos con bajo stock.
          </p>
          <Image
            src="/assets/svg/burger-guy.svg"
            alt="Ilustración de hamburguesa feliz"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  )
}

export default ControlStock
