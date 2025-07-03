'use client'

import { ProductoCombo } from '@/common/types/entities/IProductoCombo'
import InnerForm from './InnerForm'
import { useFormikContext } from 'formik'

export type FormProductos = {
  productosSeleccionados: {
    articuloId: number
    nombre: string
    precioCosto: number
    precioVenta: number
    cantidad: number
    tiempoEstimadoMinutos: number
    precioPromocional?: number
  }[]
}

type ProductoOption = {
  label: string
  value: number
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
}

type Props = {
  productosOptions: ProductoOption[]
  onFormChange?: (form: FormProductos) => void
  onChange?: (
    productosSeleccionados: ProductoCombo[],
    precioPromocional: number
  ) => void
  textButton?: string
  textLeftButton?: string
  onLeftButtonClick?: () => void
  hideSubmitButton?: boolean
  loading?: boolean
}

export default function FormProductosPromocion({
  productosOptions,
  onFormChange,
  onChange,
  textButton = 'Continuar',
  textLeftButton = 'Cancelar',
  onLeftButtonClick,
  hideSubmitButton = true,
  loading = false,
}: Props) {
  const { values, setFieldValue } = useFormikContext<FormProductos>()

  const calcularPrecioPromo = (productos: ProductoCombo[]) =>
    productos.reduce(
      (acc, p) => acc + (p.precioVenta ?? 0) * (p.cantidad ?? 1),
      0
    )

  return (
    <InnerForm
      values={values}
      productosOptions={productosOptions}
      onFormChange={onFormChange}
      onProductoChange={nuevosProductos => {
        setFieldValue('productosSeleccionados', nuevosProductos)
        onChange?.(nuevosProductos, calcularPrecioPromo(nuevosProductos))
      }}
      onLeftButtonClick={onLeftButtonClick}
      textButton={textButton}
      textLeftButton={textLeftButton}
      loading={loading}
    />
  )
}
