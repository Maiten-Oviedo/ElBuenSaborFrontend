import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'
import { ITableColumn } from '@/common/types/generic table/IGenericTableProps'

// =========== COLUMNAS DE INSUMOS =========== //
export const insumosAdminTableColumns = [
  { label: 'id', key: 'id' },
  { label: 'Nombre', key: 'denominacion' },
  { label: 'Precio Venta', key: 'precioVenta' },
  { label: 'Precio Compra', key: 'precioCosto' },
  { label: 'U. de Medida', key: 'unidadMedidaEnum' },
  { label: 'Stock Actual', key: 'stockActual' },
  { label: 'Stock Max', key: 'stockMaximo' },
  { label: 'Stock Mín', key: 'stockMinimo' },
  { label: 'Tiempo (min.)', key: 'tiempoEstimadoMinutos' },
  { label: 'Rubro', key: 'categoriaDenominacion' },
  { label: 'Estado', key: 'productoActivo' },
  { label: 'Acciones', key: 'acciones' },
]

// =========== COLUMNAS DE PRODUCTOS (manufacturados) =========== //
export const manufacturadosAdminTableColumns: ITableColumn<IArticuloManufacturado>[] =
  [
    { label: 'id', key: 'id' },
    { label: 'Nombre', key: 'denominacion' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Precio Venta', key: 'precioVenta' },
    {
      label: 'Imagenes',
      key: 'imagenesUrls',
      render: row =>
        row.imagenesUrls && row.imagenesUrls?.length > 0
          ? row.imagenesUrls?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Imagen de ${row.denominacion}`}
                className="w-16 h-16 object-cover mx-auto"
              />
            ))
          : 'Sin imágenes',
    },
    { label: 'Tiempo (min.)', key: 'tiempoEstimadoMinutos' },
    { label: 'Rubro', key: 'categoriaDenominacion' },
    {
      label: 'Receta',
      key: 'articuloManufacturadoDetalle',
      render: row =>
        row.articuloManufacturadoDetalle &&
        row.articuloManufacturadoDetalle?.length > 0 ? (
          <ol className="list-item">
            {row.articuloManufacturadoDetalle?.map((detalle, index) => (
              <li key={index}>
                {detalle.articuloDenominacion} x {detalle.cantidad}
              </li>
            ))}
          </ol>
        ) : (
          'Sin receta'
        ),
    },
    { label: 'Estado', key: 'productoActivo' },
    { label: 'Acciones', key: 'acciones' },
  ]
