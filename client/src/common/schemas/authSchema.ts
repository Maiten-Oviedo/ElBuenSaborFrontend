import * as Yup from 'yup'

export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Requerido'),
  nombre: Yup.string().required('Requerido'),
  apellido: Yup.string().required('Requerido'),
  telefono: Yup.string()
    .required('Requerido')
    .matches(
      /^[0-9\s\-()+]+$/,
      'Teléfono inválido, solo números, espacios, guiones, paréntesis'
    )
    .min(7, 'Teléfono muy corto')
    .max(15, 'Teléfono muy largo'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
})

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
})
