import * as Yup from 'yup'

export const crearEmpleadoSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'Se necesitan más de 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),

  apellido: Yup.string()
    .required('El apellido es requerido')
    .min(2, 'Se necesitan más de 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),

  telefono: Yup.string()
    .required('El teléfono es requerido')
    .min(8, 'El teléfono debe tener 8 dígitos minimo'),

  email: Yup.string()
    .required('El correo electrónico es requerido')
    .email('El correo no tiene un formato válido'),

  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(30, 'La contraseña no puede exceder 30 caracteres'),

  repetirClave: Yup.string()
    .required('Debe repetir la contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),

  rolId: Yup.string()
    .typeError('Debe seleccionar un rol')
    .required('El rol es obligatorio'),
})

export const editarEmpleadoSchema = Yup.object({
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  telefono: Yup.string().required(),
  email: Yup.string().email().required(),
  rolId: Yup.number().required(),
  activo: Yup.boolean().required(),
})
