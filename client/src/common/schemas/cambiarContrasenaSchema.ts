import * as Yup from 'yup'

export const cambiarContrasenaValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un email válido')
    .required('Debe ingresar el email asociado a su cuenta'),
  currentPassword: Yup.string().required('Debe ingresar su contraseña actual'),
  newPassword: Yup.string().required('Debe ingresar una nueva contraseña'),
})
