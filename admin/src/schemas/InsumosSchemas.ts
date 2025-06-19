import * as Yup from 'yup'

export const comprarInsumoSchema = Yup.object().shape({
  nuevoStock: Yup.number().required('Requerido').min(1, 'Debe ser mayor a 0'),
  precioCompra: Yup.number().required('Requerido').min(0, 'Debe ser mayor a 0'),
})

export const crearInsumoSchema = Yup.object({
  sucursalId: Yup.number()
    .min(1, 'Selecciona una sucursal válida')
    .required('La sucursal es obligatoria'),

  rubro: Yup.string().trim().required('El rubro es obligatorio'),

  subrubro: Yup.string().trim().required('El subrubro es obligatorio'),

  denominacion: Yup.string().trim().required('La denominación es obligatoria'),

  stockMinimo: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('Stock mínimo obligatorio'),

  stockActual: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('Stock actual obligatorio'),

  stockMaximo: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('Stock máximo obligatorio'),

  precioCompra: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('El precio de compra es obligatorio'),

  precioVenta: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('El precio de venta es obligatorio'),

  tiempo: Yup.number()
    .min(0, 'Debe ser mayor o igual a 0')
    .required('El tiempo estimado es obligatorio'),

  unidadMedidaEnum: Yup.string()
    .oneOf(['GR', 'KG', 'ML', 'L', 'UNI'], 'Unidad de medida inválida')
    .required('Unidad de medida obligatoria'),

  esParaPreparar: Yup.boolean().required(),
  productoActivo: Yup.boolean().required(),
  esVendible: Yup.boolean().required(),
})
