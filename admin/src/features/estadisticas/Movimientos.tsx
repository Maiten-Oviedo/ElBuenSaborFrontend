import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import GenericTable from '@/common/components/generic table/GenericTable'
import { movimientosTableColumns } from '@/common/lib/constants/estadisticasTableColumns'
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from 'react-icons/md'
import { FaArrowTrendUp } from 'react-icons/fa6'
import type { DateRange, Movimiento } from '@/common/hooks/useEstadisticasData'

type Props = {
  dateRange: DateRange
  movimientosData: Movimiento[]
}

export function Movimientos({ dateRange, movimientosData }: Props) {
  let sumaIngresos = 0
  let sumaCostos = 0
  let sumaGanancias = 0

  //GRÁFICO DE BARRAS
  const chartLabels = movimientosData.map(m => m.fecha)
  const chartIngresos = movimientosData.map(m => m.ingresoTotal)
  const chartCostos = movimientosData.map(m => m.costoTotal)
  const chartGanancias = movimientosData.map(m => m.ganancia)

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Ingresos',
        data: chartIngresos,
        backgroundColor: 'oklch(59.6% 0.145 163.225)', // verde
      },
      {
        label: 'Costos',
        data: chartCostos,
        backgroundColor: 'oklch(57.7% 0.245 27.325)', // rojo
      },
      {
        label: 'Ganancias',
        data: chartGanancias,
        backgroundColor: 'oklch(54.6% 0.245 262.881)', // azul
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  movimientosData.forEach(m => {
    sumaIngresos += typeof m.ingresoTotal === 'number' ? m.ingresoTotal : 0
    sumaCostos += typeof m.costoTotal === 'number' ? m.costoTotal : 0
    sumaGanancias += typeof m.ganancia === 'number' ? m.ganancia : 0
  })

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
          icon={
            <MdKeyboardDoubleArrowUp className="h-6 w-6 text-emerald-600" />
          }
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

      <div className="w-full flex gap-5">
        {/* Tabla de datos */}
        <div className="w-full max-w-[50%]">
          <GenericTable
            columns={movimientosTableColumns}
            data={movimientosData}
            error={null}
            isLoading={false}
            dataType="movimientos"
            esEstadistica={true}
          />
        </div>

        <div className="w-full max-w-[50%] h-[400px] flex items-center justify-center bg-white bg-opacity-60 p-4 rounded-xl shadow-md mx-auto">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
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
        <h3 className={`text-2xl font-bold tracking-tight ${textColor}`}>
          ${value.toLocaleString()}
        </h3>
      </div>
      <div className={`rounded-full ${bgIcon} p-3`}>{icon}</div>
    </div>
  </div>
)
