import { useEffect, useState } from 'react'
import httpClient from '../lib/httpClient'

type EstadisticasData = {
  movimientosData: any[]
  ventasPlatosData: any[]
  ventasBebidasData: any[]
  clientesData: any[]
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  currentTab: string
  setCurrentTab: (tab: string) => void
}

export type Movimiento = {
  fecha: string
  ingresoTotal: number
  costoTotal: number
  ganancia: number
}

export type DateRange = { startDate: Date; endDate: Date } | null

export const useEstadisticasData = (): EstadisticasData => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>(null)
  const [currentTab, setCurrentTab] = useState<string>('movimientos')

  const [movimientosData, setMovimientosData] = useState<Movimiento[]>([])
  const [ventasPlatosData, setVentasPlatosData] = useState<any[]>([])
  const [ventasBebidasData, setVentasBebidasData] = useState<any[]>([])
  const [clientesData, setClientesData] = useState<any[]>([])

  useEffect(() => {
    const getQuery = () => {
      const start = dateRange?.startDate ?? new Date('2000-01-01')
      let end = dateRange?.endDate ?? new Date()

      // Ajustar end al final del día si es el mismo día
      if (dateRange && start.toDateString() === end.toDateString()) {
        end = new Date(end)
        end.setHours(23, 59, 59, 999)
      }
      const inicio = start.toLocaleDateString('sv-SE') // yyyy-mm-dd
      const fin = end.toLocaleDateString('sv-SE') // yyyy-mm-dd
      return `?fechaInicio=${inicio}&fechaFin=${fin}`
    }

    const fetchData = async () => {
      const query = getQuery()
      console.log(query)

      switch (currentTab) {
        case 'movimientos':
          {
            await httpClient().post(
              `http://localhost:8080/estadisticas/generar-todos`
            )
            const data = await httpClient().get(
              `http://localhost:8080/estadisticas/diarias${query}`
            )
            setMovimientosData(data)
          }
          break
        case 'ventas-platos': {
          const data = await httpClient().get(
            `http://localhost:8080/estadisticas/ranking-manufacturados${query}`
          )
          setVentasPlatosData(data)
          break
        }
        case 'ventas-bebidas': {
          const data = await httpClient().get(
            `http://localhost:8080/estadisticas/ranking-insumos${query}`
          )
          setVentasBebidasData(data)
          break
        }
        case 'clientes': {
          const data = await httpClient().get(
            `http://localhost:8080/estadisticas/ranking-clientes${query}`
          )
          setClientesData(data)
          break
        }
      }
    }

    fetchData()
  }, [dateRange, currentTab])

  return {
    movimientosData,
    ventasPlatosData,
    ventasBebidasData,
    clientesData,
    dateRange,
    setDateRange,
    currentTab,
    setCurrentTab,
  }
}
