import { FormikErrors, FormikHelpers, FormikProps } from 'formik'
import { ObjectSchema, Schema } from 'yup'
import { ProductoOption } from '../hooks/usePromocion'
import { ProductoCombo } from './entities/IProductoCombo'
import { FormikHelpers } from 'formik'
import { ObjectSchema } from 'yup'
import { IImagenArticulo } from './entities/IImagenArticulo'

/* =============== MY FORM =============== */
export type FormField = {
  name: string
  label: string
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'email'
    | 'password'
    | 'checkbox'
    | 'time'
    | 'textarea'
  placeholder?: string
  className?: string
  options?: SelectOption[]
  id?: string
}
export type SelectOption = {
  label: string
  value: string | number
}

export interface MyFormProps<TValues extends object> {
  initialValues: TValues
  validationSchema: ObjectSchema<TValues>
  loading?: boolean
  error?: string | null
  onSubmit: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
  fields: FormField[]
  textButton?: string
  leftButton?: boolean
  typeButton?: 'submit' | 'button'
  onFormChange?: (values: TValues) => void
  onButtonClick?:
    | (() => void)
    //Este otro tipo es para las validaciones del paso dos en crear manufacturado
    | ((formikHelpers: FormikHelpers<TValues>, values: TValues) => void)
  onLeftButtonClick?: () => void
  textLeftButton?: string
  className?: string
  children?:
    | ((formikProps: FormikProps<TValues>) => React.ReactNode)
    | React.ReactNode
  designInOneColumn?: boolean //Opcional, si es true cambia el diseño de 2 columnas a 1 sola
}

/* =============== FORM RECETA MANUFACTURADO =============== */

type Opcion = {
  precioCosto?: number
  precioVenta?: number
  value: number
  label: string
  unidadMedida?: string
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
  leftButton?: boolean
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

export interface IStepTwoValues {
  denominacion: string
  productoActivo: boolean
  imagenesUrls: string[] | IImagenArticulo[]
  descripcion: string
  esVendible: boolean
}
export interface IStepOneValues {
  categoriaId: number
}

export interface IStepFourValues {
  precioCosto: number
  precioVenta: number
  tiempoEstimadoMinutos: number
  margen: number | null | undefined
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
    id: number
    nombre: string
    cantidad: number
    precioVenta: number
    precioCosto: number
    tiempoEstimadoMinutos: number
  }>
}

export type FormStepThreeValues = {
  precioPromocional: number
  horaHasta: Date
  horaDesde: Date
  fechaDesde: Date
  fechaHasta: Date
}

export interface FormBaseSinInsumosProps<
  TValues extends Record<string, unknown>
> {
  initialValues?: TValues
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

export interface FormProductosPromocionProps
  extends FormBaseSinInsumosProps<any> {
  productosOptions: ProductoOption[]
  defaultSeleccionados?: ProductoCombo[]
  defaultPrecioPromocional?: number
  onChange: (
    productosSeleccionados: ProductoCombo[],
    precioPromocional: number
  ) => void
}
