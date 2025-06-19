import * as Yup from 'yup'

export const editarCuentaValidationSchema = Yup.object({
  nombre: Yup.string().trim().required('El nombre es obligatorio'),
  apellido: Yup.string().trim().required('El apellido es obligatorio'),
  telefono: Yup.string()
    .trim()
    .matches(/^[0-9()+\-\s]*$/, 'El teléfono contiene caracteres inválidos')
    .min(6, 'El teléfono es demasiado corto')
    .max(20, 'El teléfono es demasiado largo')
    .required('El teléfono es obligatorio'),
})

export const editarImagenCuentaValidationSchema = Yup.object({
  imagen: Yup.string()
    .url('Debe ser una URL válida')
    .required('La imagen es obligatoria'),
})
