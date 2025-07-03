import httpClient from '../lib/httpClient'
import { useStorePromociones } from '@/store/storePromocion'

export type ProductoOption = {
  id?: number
  articuloDenominacion?: string
  cantidad?: number
  label: string
  value: number
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
}

export const createPromocion = async (payload: any) => {
  try {
    const data = await httpClient().post(
      'http://localhost:8080/articulo-promocion',
      {
        body: JSON.stringify(payload),
      }
    )

    // Llama al store para refrescar la tabla
    const { getAll } = useStorePromociones.getState()
    await getAll()

    return data
  } catch (error: any) {
    console.error('Error al crear promoción:', error)
    throw new Error(error.message || 'Error al crear la promoción')
  }
}

export const updatePromocion = async (id: string, payload: any) => {
  try {
    const data = await httpClient().put(
      `http://localhost:8080/articulo-promocion/${id}`,
      {
        body: JSON.stringify(payload),
      }
    )

    // Llama al store para refrescar la tabla
    const { getAll } = useStorePromociones.getState()
    await getAll()
    return data
  } catch (error: any) {
    console.error('Error al actualizar promoción:', error)
    throw new Error(error.message || 'Error al actualizar promoción')
  }
}

export const getProductosOptions = async (): Promise<ProductoOption[]> => {
  try {
    const [dataManufacturados, dataVendibles] = await Promise.all([
      httpClient().get('http://localhost:8080/articulo-manufacturado/getAll'),
      httpClient().get(
        'http://localhost:8080/articulo-insumo/vendibles/basic/getAll'
      ),
    ])

    const todos = [...dataManufacturados, ...dataVendibles]

    const options: ProductoOption[] = todos.map((p: any) => ({
      value: p.id,
      label: p.denominacion,
      precioCosto: p.precioCosto ?? 0,
      precioVenta: p.precioVenta,
      tiempoEstimadoMinutos: p.tiempoEstimadoMinutos ?? 0,
    }))

    return options.sort((a, b) => a.label.localeCompare(b.label))
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return []
  }
}

export const getPromocionById = async (id: string) => {
  try {
    const promocion = await httpClient().get(
      `http://localhost:8080/articulo-promocion/${id}`
    )

    return promocion
  } catch (error) {
    console.error('Error al obtener promoción:', error)
    throw new Error((error as any).message || 'Error al obtener la promoción')
  }
}
