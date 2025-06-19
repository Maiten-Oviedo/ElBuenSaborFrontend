import React, { useEffect, useMemo } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import { movimientosTableColumns } from '@/common/lib/constants/estadisticasTableColumns'
import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md"
import { FaArrowTrendUp } from "react-icons/fa6"
import { useEstadisticasData } from '@/common/hooks/useEstadisticasData'
import type { DateRange, Movimiento } from '@/common/hooks/useEstadisticasData'

type Props = {
  dateRange: DateRange
  movimientosData: Movimiento[]
}

export function Movimientos({ dateRange, movimientosData }: Props) {

  let sumaIngresos = 0
  let sumaCostos = 0
  let sumaGanancias = 0


  movimientosData.forEach(m => {
    sumaIngresos += typeof m.ingresoTotal === 'number' ? m.ingresoTotal : 0
    sumaCostos += typeof m.costoTotal === 'number' ? m.costoTotal : 0
    sumaGanancias += typeof m.ganancia === 'number' ? m.ganancia : 0
  })


  useEffect(() => {
    fetch('http://localhost:8080/estadisticas/generar', {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al generar estadísticas');
        }
        return response.text();
      })
      .then(data => {
        console.log('Respuesta del backend:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }, [])


  return (
    <div>
      <p className="font-bold mb-4">
        {dateRange
          ? `Resultados para: ${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
          : 'Mostrando todos los registros'}
      </p>

      <div className="grid gap-4 md:grid-cols-3 my-10">
        <ResumenCard
          title="Ingresos Totales"
          value={sumaIngresos}
          icon={<MdKeyboardDoubleArrowUp className="h-6 w-6 text-emerald-600" />}
          bgIcon="bg-emerald-100"
          textColor="text-emerald-600"
        />
        <ResumenCard
          title="Costos Totales"
          value={sumaCostos}
          icon={<MdKeyboardDoubleArrowDown className="h-6 w-6 text-red-600" />}
          bgIcon="bg-red-100"
          textColor="text-red-600"
        />
        <ResumenCard
          title="Ganancias Totales"
          value={sumaGanancias}
          icon={<FaArrowTrendUp className="h-6 w-6 text-blue-600" />}
          bgIcon="bg-blue-100"
          textColor="text-blue-600"
        />
      </div>

      {/* Tabla de datos */}
      <GenericTable
        columns={movimientosTableColumns}
        data={movimientosData}
        error={null}
        isLoading={false}
        dataType="movimientos"
      />
    </div>
  )
}

type CardProps = {
  title: string
  value: number
  icon: React.ReactNode
  bgIcon: string
  textColor: string
}

const ResumenCard = ({ title, value, icon, bgIcon, textColor }: CardProps) => (
  <div className="bg-white bg-opacity-50 text-black rounded-sm">
    <div className="flex flex-row items-center justify-between p-6">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className={`text-2xl font-bold tracking-tight ${textColor}`}>${value.toLocaleString()}</h3>
      </div>
      <div className={`rounded-full ${bgIcon} p-3`}>
        {icon}
      </div>
    </div>
  </div>
)
