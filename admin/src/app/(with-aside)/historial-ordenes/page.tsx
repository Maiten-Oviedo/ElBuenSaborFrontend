'use client'
import DateFilterCalendar from '@/common/components/calendar/DateFilterCalendar'
import GenericTable from '@/common/components/generic table/GenericTable'
import { historialOrdenesTableColumns } from '@/common/lib/constants/adminTableColumns'
import httpClient from '@/common/lib/httpClient'
import { IPedido } from '@/common/types/entities/IPedido'
import { usePedidoStore } from '@/store/storePedidos'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuCalendarDays } from 'react-icons/lu'
import { useShallow } from 'zustand/shallow'

export type DateRange = { startDate: Date; endDate: Date } | null

const HistorialOrdenes = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [dateRange, setDateRange] = useState<DateRange>(null)
  const [pedidos, setPedidos] = useState<IPedido[]>()

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const toggleCalendar = () => setIsCalendarOpen(prev => !prev)
  const clearDateRange = () => setDateRange(null)
  // const { pedidos, fetchPedidos } = usePedidoStore(
  //   useShallow(state => ({
  //     pedidos: state.pedidos,
  //     fetchPedidos: state.fetchPedidos,
  //   }))
  // )

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
      try {
        setIsLoading(true)
        const query = getQuery()
        const res = await httpClient().get(
          `http://localhost:8080/pedido/fecha-rango${query}`
        )
        setPedidos(res as IPedido[])
      } catch (error: unknown) {
        let errorMessage = 'Error desconocido'

        if (error instanceof Error) {
          errorMessage = error.message
        }

        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  const formatRange = () => {
    if (!dateRange) return 'Sin filtro de fecha'
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    } as const
    const from = dateRange.startDate.toLocaleDateString('es-AR', options)
    const to = dateRange.endDate.toLocaleDateString('es-AR', options)
    return from === to ? from : `${from} - ${to}`
  }

  if (error) return null
  if (isLoading) return <p>Cargando...</p>
  return (
    <div className="w-full h-full">
      <header className="top-0 z-10">
        <div className="container flex h-16 items-start justify-between py-4">
          <h1 className="font-semibold text-white">HISTORIAL DE ÓRDENES</h1>

          <div className="flex items-center gap-2 relative">
            {!isCalendarOpen ? (
              <div className="flex gap-5">
                <button
                  onClick={clearDateRange}
                  className="bg-white text-black text-sm px-4 rounded-sm border-gray-100 flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <FaRegTrashAlt /> Borrar Selección
                </button>
                <button
                  onClick={toggleCalendar}
                  className="flex items-center text-sm gap-2 px-3 py-1 bg-white font-bold cursor-pointer text-black rounded hover:bg-gray-600 hover:text-white transition"
                >
                  <LuCalendarDays />
                  {formatRange()}
                </button>
              </div>
            ) : (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded z-50">
                <DateFilterCalendar
                  dateRange={dateRange}
                  onChange={range => {
                    console.log('setDateRange ejecutado con:', range)
                    setDateRange(range) // <--- Este debe disparar el setState
                  }}
                />
                <div className="flex justify-end p-2">
                  <button
                    onClick={toggleCalendar}
                    className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {pedidos && pedidos.length > 0 ? (
        <div className="w-full mt-8">
          <GenericTable
            dataType="historial-ordenes"
            columns={historialOrdenesTableColumns}
            data={pedidos}
            isLoading={isLoading}
            error={error}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 items-center justify-center mt-8">
          <p className="font-semibold">No tienes órdenes todavía.</p>
          <Image
            src="/assets/images/burger-guy-triste.png"
            alt="Ilustración de hamburguesa triste"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  )
}

export default HistorialOrdenes
