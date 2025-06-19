import { useState } from "react"
import httpClient from "../lib/httpClient"
import {
  transformPromocionValuesForBackend,
} from "../lib/promocionUtils"
import { FormStepOneValues, FormStepThreeValues, FormStepTwoValues } from "../types/form.types"

export type ProductoOption = {
  label: string
  value: number
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
}

export const getProductosOptions = async (): Promise<ProductoOption[]> => {
  try {
    const [resManufacturados, resBebidas] = await Promise.all([
      fetch('http://localhost:8080/articulo-manufacturado/getAll'),
      fetch('http://localhost:8080/articulo-insumo/bebidas/getAll'),
    ])

    if (!resManufacturados.ok || !resBebidas.ok) {
      throw new Error('Error al obtener productos o bebidas')
    }

    const dataManufacturados = await resManufacturados.json()
    const dataBebidas = await resBebidas.json()

    const allProducts = [...dataManufacturados, ...dataBebidas]

    const options: ProductoOption[] = allProducts.map((producto: any) => ({
      value: producto.id,
      label: producto.denominacion,
      precioCosto: producto.precioCosto ?? 0,
      precioVenta: producto.precioVenta,
      tiempoEstimadoMinutos: producto.tiempoEstimadoMinutos ?? 0, // para bebidas puede que no exista
    })).sort((a, b) => a.label.localeCompare(b.label))

    return options
  } catch (error) {
    console.error('Error al cargar productos:', error)
    return []
  }
}

export const usePromocion = () => {
  const createPromocion = async (formOneValues: FormStepOneValues, formTwoValues: FormStepTwoValues, finalValues: FormStepThreeValues) => {
    try {
      const payload = transformPromocionValuesForBackend(
        formOneValues,
        formTwoValues,
        finalValues
      )

      await httpClient().post("http://localhost:8080/articulo-promocion", {
        body: JSON.stringify(payload),
      })
      console.log("✅ Producto enviado: ", payload)

      return { success: true }
    } catch (err) {
      console.error("❌ Error al crear promoción:", err)
      return { success: false, error: err }
    }
  }

  return {
    createPromocion,
  }
}