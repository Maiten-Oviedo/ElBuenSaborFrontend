import * as Yup from 'yup'

export const crearRubroSchema = Yup.object().shape({
  denominacion: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'Se necesitan más de 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  categoriaPadre: Yup.number().nullable(),
})

export const editarRubroSchema = Yup.object().shape({
  denominacion: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'Se necesitan más de 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  categoriaPadre: Yup.number().nullable(),
})
