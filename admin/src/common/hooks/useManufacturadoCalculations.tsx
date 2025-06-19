'use client'

import type React from 'react'

import { useEffect } from 'react'
import type { FormThreeValues } from '@/features/modalManufacturado/FormRecetaManufacturado'

export const useManufacturadoCalculations = (
  formThreeValues: FormThreeValues,
  insumos: any[],
  setFormFourValues: React.Dispatch<React.SetStateAction<any>>,
  isEditing = false
) => {
  // Función para calcular el precio de costo siguiendo la lógica del backend
  const calcularPrecioCosto = (
    detalles: FormThreeValues['articuloManufacturadoDetalle']
  ) => {
    let costoTotal = 0

    detalles.forEach(detalle => {
      const insumo = insumos.find(
        insumo => Number(insumo.id) === Number(detalle.articuloInsumoId)
      )
      if (insumo && insumo.precioVenta) {
        // Lógica del backend: (precio / 1000) * cantidad
        const precioPorGramo = insumo.precioVenta / 1000
        const precioPorCantidad = precioPorGramo * detalle.cantidad
        costoTotal += precioPorCantidad
      }
    })

    return Number(costoTotal.toFixed(4))
  }

  // Función para calcular el tiempo estimado
  const calcularTiempoEstimado = (
    detalles: FormThreeValues['articuloManufacturadoDetalle']
  ) => {
    let totalTiempoEstimado = 0

    detalles.forEach(detalle => {
      const insumo = insumos.find(
        insumo => Number(insumo.id) === Number(detalle.articuloInsumoId)
      )
      if (insumo) {
        totalTiempoEstimado += insumo.tiempoEstimadoMinutos || 0
      }
    })

    return totalTiempoEstimado
  }

  useEffect(() => {
    if (!formThreeValues || !formThreeValues.articuloManufacturadoDetalle)
      return

    const totalTiempoEstimado = calcularTiempoEstimado(
      formThreeValues.articuloManufacturadoDetalle
    )
    const precioCostoCalculado = calcularPrecioCosto(
      formThreeValues.articuloManufacturadoDetalle
    )

    setFormFourValues((prev: any) => {
      if (isEditing) {
        // En edición: ajustar precio de venta si es menor al nuevo costo
        const nuevoPrecioVenta =
          prev.precioVenta < precioCostoCalculado
            ? precioCostoCalculado * 1.3
            : prev.precioVenta

        return {
          ...prev,
          tiempoEstimadoMinutos: totalTiempoEstimado,
          precioCosto: precioCostoCalculado,
          precioVenta: Math.max(nuevoPrecioVenta, precioCostoCalculado),
        }
      } else {
        // En creación: calcular precio de venta sugerido
        const precioVentaSugerido = Number(
          (precioCostoCalculado * 1.3).toFixed(2)
        )
        const nuevoPrecioVenta =
          prev.precioVenta < precioCostoCalculado
            ? precioVentaSugerido
            : Math.max(prev.precioVenta, precioCostoCalculado)

        return {
          ...prev,
          tiempoEstimadoMinutos: totalTiempoEstimado,
          precioCosto: precioCostoCalculado,
          precioVenta: nuevoPrecioVenta,
        }
      }
    })
  }, [formThreeValues, insumos, isEditing])

  return { calcularPrecioCosto, calcularTiempoEstimado }
}
