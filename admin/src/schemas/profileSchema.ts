import * as Yup from 'yup'

export const editarMisDatosEmpleadoValidationSchema = Yup.object({
  nombre: Yup.string().trim().required('El nombre es obligatorio'),
  apellido: Yup.string().trim().required('El apellido es obligatorio'),
  telefono: Yup.string()
    .trim()
    .matches(/^[0-9()+\-\s]*$/, 'El teléfono contiene caracteres inválidos')
    .min(6, 'El teléfono es demasiado corto')
    .max(20, 'El teléfono es demasiado largo')
    .required('El teléfono es obligatorio'),
})

export const cambiarContrasenaValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un email válido')
    .required('Debe ingresar el email asociado a su cuenta'),
  currentPassword: Yup.string().required('Debe ingresar su contraseña actual'),
  newPassword: Yup.string().required('Debe ingresar una nueva contraseña'),
})
