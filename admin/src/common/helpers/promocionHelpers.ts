import type { ProductoCombo } from '@/common/types/entities/IProductoCombo'
import type { IArticuloPromocion } from '@/common/types/entities/IArticuloPromocion'
import type { ProductoOption } from '@/common/hooks/usePromocion'

/**
 * Adapta productos seleccionados por el usuario para mantener consistencia en los datos
 */
export const adaptarProductosDelUsuario = (productos: ProductoCombo[]): ProductoCombo[] => {
    return productos.map(p => ({
        value: p.value ?? p.articuloId,
        label: p.label ?? p.nombre,
        articuloId: p.articuloId ?? p.value,
        nombre: p.nombre ?? p.label,
        cantidad: p.cantidad,
        precioCosto: p.precioCosto,
        precioVenta: p.precioVenta,
        tiempoEstimadoMinutos: p.tiempoEstimadoMinutos,
    }))
}

/**
 * Adapta los productos desde el backend (promoción existente) para mostrar en el formulario
 */
export const adaptarProductosDesdeBackend = (
    promocion: IArticuloPromocion,
    productosDisponibles: ProductoOption[]
): ProductoCombo[] => {
    return promocion.promocionDetalle.map((detalle) => {
        const producto = productosDisponibles.find(p => p.value === detalle.articuloId)
        return {
            value: detalle.articuloId,
            label: detalle.articuloDenominacion,
            articuloId: detalle.articuloId,
            nombre: detalle.articuloDenominacion,
            cantidad: detalle.cantidad,
            precioCosto: producto?.precioCosto ?? 0,
            precioVenta: producto?.precioVenta ?? 0,
            tiempoEstimadoMinutos: producto?.tiempoEstimadoMinutos ?? 0,
        }
    })
}

/**
 * Calcula el tiempo total estimado de preparación
 */
export const calcularTiempoTotal = (productos: ProductoCombo[]): number => {
    return productos.reduce(
        (acc, p) => acc + (p.tiempoEstimadoMinutos ?? 0) * (p.cantidad ?? 1),
        0
    )
}

/**
 * Calcula el precio total de venta
 */
export const calcularPrecioTotal = (productos: ProductoCombo[]): number => {
    return productos.reduce(
        (acc, p) => acc + (p.precioVenta ?? 0) * (p.cantidad ?? 1),
        0
    )
}

/**
 * Calcula el precio de costo total
 */
export const calcularPrecioCostoTotal = (productos: ProductoCombo[]): number => {
    return productos.reduce(
        (acc, p) => acc + (p.precioCosto ?? 0) * (p.cantidad ?? 1),
        0
    )
}

/**
 * Genera una descripción automática basada en los productos seleccionados
 */
export const generarDescripcion = (productos: ProductoCombo[]): string => {
    return productos
        .map(p => `${p.cantidad} ${p.nombre}`)
        .join(', ')
}

/**
 * Valida si una URL es válida
 */
export const validarUrl = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i
    return urlRegex.test(url.trim())
}
