import * as Yup from 'yup'

export const crearDomicilioSchema = Yup.object({
  pais: Yup.number().required('El país es obligatorio'),
  provincia: Yup.number().required('La provincia es obligatoria'),
  localidad: Yup.number().required('La localidad es obligatoria'),
  codigoPostal: Yup.string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .required('El código postal es obligatorio'),
  calle: Yup.string().required('La calle es obligatoria'),
  numero: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('El número es obligatorio'),
  descripcion: Yup.string().nullable(),
})

export const editarDomicilioSchema = Yup.object({
  pais: Yup.number().required('El país es obligatorio'),
  provincia: Yup.number().required('La provincia es obligatoria'),
  localidad: Yup.number().required('La localidad es obligatoria'),
  codigoPostal: Yup.string()
    .min(3, 'Debe tener al menos 3 caracteres')
    .required('El código postal es obligatorio'),
  calle: Yup.string().required('La calle es obligatoria'),
  numero: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('El número es obligatorio'),
  descripcion: Yup.string().nullable(),
})

