import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'
import { ICliente } from '@/common/types/entities/ICliente'
import { IPedido } from '@/common/types/entities/IPedido'
import { ITableColumn } from '@/common/types/generic table/IGenericTableProps'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'

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
        row.imagenesUrls && row.imagenesUrls.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-1">
            {row.imagenesUrls.map((img, index) => {
              const url = typeof img === 'string' ? img : img.url
              const key = typeof img === 'string' ? index : img.id ?? index

              return (
                <img
                  key={key}
                  src={url}
                  alt={`Imagen de ${row.denominacion}`}
                  className="w-16 h-16 object-cover rounded"
                />
              )
            })}
          </div>
        ) : (
          'Sin imágenes'
        ),
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

// =========== COLUMNAS DE CONTROL STOCK =========== //
export const controlStockTableColumns: ITableColumn<IArticuloInsumo>[] = [
  { label: 'id', key: 'id' },
  { label: 'Nombre', key: 'denominacion' },
  { label: 'U. de Medida', key: 'unidadMedidaEnum' },
  {
    label: 'Stock Actual',
    key: 'stockActual',
    render: row => (
      <p
        className={`w-full h-full flex gap-2 justify-center items-center rounded-xl ${
          row.stockActual < row.stockMinimo ? 'bg-red-300' : 'bg-[#FFE9A1]'
        }`}
      >
        {row.stockActual}
        {row.stockActual < row.stockMinimo ? (
          <MdOutlineKeyboardDoubleArrowDown color="#8E1D13" size="20" />
        ) : (
          <IoWarningOutline color="#A96224" size="20" />
        )}
      </p>
    ),
  },
  {
    label: 'Debes comprar',
    key: 'diferencia',
    render: row =>
      row.stockActual >= row.stockMinimo
        ? '-'
        : row.stockMinimo - row.stockActual,
  },
  { label: 'Stock Mín', key: 'stockMinimo' },
  {
    label: 'Comprar',
    key: 'acciones',
    render: row => (
      <Link href={'/nueva-compra'}>
        <FaShoppingCart size="20" />{' '}
      </Link>
    ),
  },
]

// =========== COLUMNAS DE CLIENTES =========== //
export const clientesAdminTableColumns: ITableColumn<ICliente>[] = [
  { label: 'id', key: 'id' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Apellido', key: 'apellido' },
  { label: 'Teléfono', key: 'telefono' },
  {
    label: 'Email',
    key: 'email',
  },
  // {
  //   label: 'Domicilio/s',
  //   key: 'domicilio',
  //   Cell: ({ row }: { row: ICliente }) => {
  //     if (row.domicilio && row.domicilio.length > 0) {
  //       return (
  //         <ol className="list-decimal list-inside text-left text-wrap">
  //           {row.domicilio.map((dom: IDomicilio, index: number) => (
  //             <li key={index}>
  //               {`${dom.calle} ${dom.numero}, ${dom.localidad.nombre}, ${dom.provincia.nombre}, ${dom.pais.nombre}`}
  //             </li>
  //           ))}
  //         </ol>
  //       )
  //     }
  //     return null
  //   },
  // },
  { label: 'Estado', key: 'activo' },
  { label: 'Acciones', key: 'acciones' },
]

// =========== COLUMNAS DE HISTORIAL DE ÓRDENES =========== //
export const historialOrdenesTableColumns: ITableColumn<IPedido>[] = [
  { label: 'id', key: 'id' },
  { label: 'Fecha', key: 'fechaPedido' },
  { label: 'Cliente', key: 'nombreCompleto' },
  { label: 'Estado', key: 'estadoEnum' },
  { label: 'Estado Pago', key: 'estadoPagoEnum' },
  { label: 'Total', key: 'total' },
  { label: 'Acciones', key: 'viewMore' },
]
