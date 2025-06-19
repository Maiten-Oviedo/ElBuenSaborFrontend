// =========== COLUMNAS DE MOVIMIENTOS =========== //
export const movimientosTableColumns = [
    { label: 'fecha', key: 'fecha' },
    { label: 'ingresos', key: 'ingresoTotal' },
    { label: 'costos', key: 'costoTotal' },
    { label: 'ganancias', key: 'ganancia' },
]

// =========== COLUMNAS DE PRODUCTOS =========== //
export const cocinaTableColumns = [
    { label: 'Nombre', key: 'denominacion' },
    { label: 'Ventas', key: 'cantidadTotal' },
    { label: 'Total Recaudado', key: 'totalRecaudado' },
]

export const bebidasTableColumns = [
    { label: 'Nombre', key: 'denominacion' },
    { label: 'Ventas', key: 'cantidadTotal' },
    { label: 'Total Recaudado', key: 'totalRecaudado' },
]

// =========== COLUMNAS DE CLIENTES =========== //
export const clientesTableColumns = [
    { label: 'nombre', key: 'nombre' },
    { label: 'apellido', key: 'apellido' },
    { label: 'Cantidad Pedidos', key: 'cantidadPedidosFinalizados' },
    { label: 'Total gastado', key: 'totalPedidosFinalizados' },
]