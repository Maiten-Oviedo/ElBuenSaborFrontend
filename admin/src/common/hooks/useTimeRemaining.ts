import { useState, useEffect, useRef, useCallback } from 'react'
import dayjs from 'dayjs'

type UseTimeRemainingProps = {
  horaEstimadaInicial: string
  onActualizarHora: (nuevaHora: string) => Promise<void> | void
}

export default function useTimeRemaining({ horaEstimadaInicial, onActualizarHora }: UseTimeRemainingProps) {
  const [minutosRestantes, setMinutosRestantes] = useState(0)
  const [horaEstimada, setHoraEstimada] = useState(horaEstimadaInicial)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Función para calcular minutos restantes y actualizar estado
  const calcularMinutosRestantes = useCallback(() => {
    const ahora = dayjs()
    const hoy = dayjs().format('YYYY-MM-DD')
    const fechaHoraEstimada = dayjs(`${hoy} ${horaEstimada}`, 'YYYY-MM-DD HH:mm:ss')

    if (!fechaHoraEstimada.isValid()) {
      setMinutosRestantes(0)
      return
    }

    const diffMin = fechaHoraEstimada.diff(ahora, 'minute') 
    setMinutosRestantes(diffMin)
  }, [horaEstimada])

  // Efecto para iniciar y limpiar intervalo cada minuto
  useEffect(() => {
    calcularMinutosRestantes()
    intervalRef.current = setInterval(calcularMinutosRestantes, 60000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [calcularMinutosRestantes])

  // Función para sumar minutos a la hora estimada
const sumarMinutos = async (minutos: number) => {
  const hoy = dayjs().format('YYYY-MM-DD')
  const fechaHora = dayjs(`${hoy} ${horaEstimada}`, 'YYYY-MM-DD HH:mm:ss.SSS') // incluimos fracción

  if (!fechaHora.isValid()) {
    console.error('Hora estimada inválida:', horaEstimada)
    return
  }

  const nuevaHora = fechaHora.add(minutos, 'minute').format('HH:mm:ss.SSS') // conservar precisión
  setHoraEstimada(nuevaHora)

  try {
    await onActualizarHora(nuevaHora)
  } catch (error) {
    console.error('Error al actualizar hora:', error)
  }
}

  // Función para setear hora estimada desde fuera (si cambia en store o backend)
  const setHora = (nuevaHora: string) => {
    setHoraEstimada(nuevaHora)
  }

  return {
    minutosRestantes,
    horaEstimada,
    sumarMinutos,
    setHora,
  }
}
