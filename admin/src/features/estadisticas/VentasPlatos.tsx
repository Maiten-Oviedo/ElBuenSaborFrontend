'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend, Title)
import { useState } from 'react'
import GenericTable from '@/common/components/generic table/GenericTable'
import { cocinaTableColumns } from '@/common/lib/constants/estadisticasTableColumns'

type Plato = {
  denominacion: string
  cantidadTotal: number
  totalRecaudado: number
}

type Props = {
  dateRange: { startDate: Date; endDate: Date } | null
  platosData: Plato[]
}

export function VentasPlatos({ dateRange, platosData }: Props) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const labels = platosData.map(p => p.denominacion)
  const cantidades = platosData.map(p => p.cantidadTotal)

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Cant. ventas',
        data: cantidades,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#66BB6A',
          '#BA68C8',
          '#FFA726',
          '#8D6E63',
          '#42A5F5',
          '#D4E157',
          '#90A4AE',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#1f2937',
        },
      },
      title: {
        display: true,
        text: 'Ranking Manufacturados - Cant. Ventas',
        color: '#1f2937',
        font: { size: 16, weight: 'bold' as const },
      },
    },
  }

  return (
    <div>
      <div>
        <p className="font-bold">
          {dateRange
            ? `Resultados para: ${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
            : 'Mostrando todos los registros'}
        </p>
      </div>
      <div className="w-full h-16 flex justify-center items-center">
        <p className="font-black text-2xl">RANKING MANUFACTURADOS</p>
      </div>

      <div className="w-full flex gap-5">
        <div className="w-full max-w-[50%]">
          <GenericTable
            columns={cocinaTableColumns}
            data={platosData}
            error={error}
            isLoading={isLoading}
            dataType="movimientos"
            esEstadistica={true}
          />
        </div>
        {platosData.length > 0 && (
          <div className="w-full max-w-[50%] h-[400px] flex items-center justify-center bg-white bg-opacity-60 p-4 rounded-xl shadow-md mx-auto">
            <Pie data={pieData} options={pieOptions} />
          </div>
        )}
      </div>
    </div>
  )
}
