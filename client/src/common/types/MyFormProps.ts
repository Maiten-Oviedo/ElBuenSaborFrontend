import { FormikErrors, FormikHelpers } from 'formik'
import { ChangeEvent } from 'react'
import { ObjectSchema } from 'yup'

/* =============== MY FORM =============== */
export type SelectOption = {
  label: string
  value: string | number
}
export type FormField = {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'password' | 'select'
  disabled?: boolean
  placeholder?: string
  className?: string
  options?: SelectOption[]
  id?: string
  onChange?: ((e: ChangeEvent<any>) => void) | (() => void)
}

export interface MyFormProps<TValues extends Record<string, unknown>> {
  initialValues: TValues
  loading?: boolean
  error?: string | null
  onSubmit?: (values: TValues, formikHelpers: FormikHelpers<TValues>) => void
  onChange?: (
    values: TValues
  ) => void | ((event: React.ChangeEvent<any>) => void)
  fields: FormField[]
  textButton?: string
  typeButton?: 'submit' | 'button'
  textLeftButton?: string
  onLeftButtonClick?: () => void
  onButtonClick?:
    | (() => void)
    //Este otro tipo es para las validaciones del paso dos en crear manufacturado
    | ((formikHelpers: FormikHelpers<TValues>, values: TValues) => void)
  className?: string
  validationSchema?: ObjectSchema<TValues>
  designInOneColumn?: boolean //Opcional, si es true cambia el diseño de 2 columnas a 1 sola
  textColor?: string
}
