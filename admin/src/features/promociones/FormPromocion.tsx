'use client'

import { Formik } from 'formik'
import InnerForm from './InnerForm'
import Button from '../../common/components/button/Button'
import { FormBaseSinInsumosProps } from '@/common/types/form.types'

export type FormStepTwoPromocionValues = {
  productosSeleccionados: {
    id: number
    nombre: string
    precioCosto: number
    precioVenta: number
    cantidad: number
    tiempoEstimadoMinutos: number
  }[]
}

type ProductoOption = {
  label: string
  value: number
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
}

type Props = FormBaseSinInsumosProps<FormStepTwoPromocionValues> & {
  productosOptions: ProductoOption[]
}

export default function FormProductosPromocion({
  initialValues,
  validationSchema,
  onSubmit,
  loading = false,
  error,
  productosOptions,
  textButton = 'Guardar',
  textLeftButton = 'Cancelar',
  onLeftButtonClick,
  onFormChange,
}: Props) {
  return (
    <Formik<FormStepTwoPromocionValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, helpers) => onSubmit(values, helpers)}
    >
      {({ values }) => (
        <InnerForm
          values={values}
          productosOptions={productosOptions}
          onFormChange={onFormChange}
          onLeftButtonClick={onLeftButtonClick}
          textButton={textButton}
          textLeftButton={textLeftButton}
          loading={loading}
        />
      )}
    </Formik>
  )
}
