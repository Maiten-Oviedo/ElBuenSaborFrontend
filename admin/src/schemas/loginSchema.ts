import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({
  user_email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Campo obligatorio'),
})
