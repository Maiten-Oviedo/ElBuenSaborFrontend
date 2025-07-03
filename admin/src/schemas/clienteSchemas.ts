import * as Yup from 'yup'

export const editarClienteValidationSchema = Yup.object({
  nombre: Yup.string().trim().required('El nombre es obligatorio'),
  apellido: Yup.string().trim().required('El apellido es obligatorio'),
  telefono: Yup.string()
    .trim()
    .matches(/^[0-9()+\-\s]*$/, 'El teléfono contiene caracteres inválidos')
    .min(6, 'El teléfono es demasiado corto')
    .max(20, 'El teléfono es demasiado largo')
    .required('El teléfono es obligatorio'),
  activo: Yup.boolean().required('El estado es obligatorio'),
})
