import { FormikErrors, FormikHelpers } from 'formik'
import { ObjectSchema, Schema } from 'yup'

/* =============== MY FORM =============== */
export type SelectOption = {
  label: string
  value: string | number
}
export type FormField = {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'date'  
  placeholder?: string
  className?: string
  options?: SelectOption[]
  id?: string
}

export interface MyFormProps<TValues extends Record<string, unknown>> {
  initialValues: TValues
  validationSchema: ObjectSchema<TValues>
  loading?: boolean
  error?: string | null
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
  fields: FormField[]
  textButton?: string
  typeButton?: 'submit' | 'button'
   onFormChange?: (values: TValues) => void,
  onButtonClick?:
    | (() => void)
    //Este otro tipo es para las validaciones del paso dos en crear manufacturado
    | ((formikHelpers: FormikHelpers<TValues>, values: TValues) => void)
  onLeftButtonClick?: () => void
  textLeftButton?: string
  className?: string
}

/* =============== FORM RECETA MANUFACTURADO =============== */

type Opcion = {
  precioCosto: number
  precioVenta: number
  value: number
  label: string
}

export interface FormRecetaManufacturadoProps<
  TValues extends Record<string, unknown>
> {
  initialValues: TValues
  validationSchema: ObjectSchema<TValues>
  loading?: boolean
  error?: string | null
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
  insumosOptions: Opcion[]
  textButton?: string
  textLeftButton?: string
  onLeftButtonClick?: () => void
  onFormChange?: (values: TValues) => void
}

export interface FormCategoriaManufacturadoProps<
  TValues extends Record<string, unknown>
> {
  initialValues: TValues
  validationSchema: ObjectSchema<TValues>
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
}

/* =============== FORM PROMOCION =============== */
export type FormStepOneValues = {
  denominacion: string
  descripcionDescuento: string
  imagenesUrls: string
  productoActivo: boolean
  categoriaId: number
}

export type FormStepTwoValues = {
  productosSeleccionados: Array<{
    id: number; 
    nombre: string 
    cantidad: number
    precioVenta: number
    precioCosto: number
    tiempoEstimadoMinutos: number
}> 
}

export type FormStepThreeValues = {
  precioPromocional: number
  horaHasta:  Date
  horaDesde:  Date
  fechaDesde: Date 
  fechaHasta: Date
}

export interface FormBaseSinInsumosProps<
  TValues extends Record<string, unknown>
> {
  initialValues: TValues
  validationSchema: ObjectSchema<TValues>
  loading?: boolean
  error?: string | null
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
  productosOptions: Opcion[]
  textButton?: string
  textLeftButton?: string
  onLeftButtonClick?: () => void
  onFormChange?: (values: TValues) => void
}