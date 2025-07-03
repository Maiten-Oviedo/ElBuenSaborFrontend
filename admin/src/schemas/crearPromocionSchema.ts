import { FormValues } from '@/common/lib/constants/promocionForm'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export const productosSeleccionadosSchema = Yup.array()
  .of(
    Yup.object({
      articuloId: Yup.number()
        .moreThan(0, 'Seleccioná un producto válido')
        .required('Producto requerido'),
      nombre: Yup.string().required('Nombre requerido'),
      precioCosto: Yup.number().required('Requerido'),
      precioVenta: Yup.number().required('Precio requerido'),
      cantidad: Yup.number().min(1, 'Mínimo 1').required('Cantidad requerida'),
      tiempoEstimadoMinutos: Yup.number()
        .min(0, 'Debe ser mayor o igual a 0')
        .required('Requerido'),
    })
  )
  .min(1, 'Debe haber al menos un producto')
  .required('Campo obligatorio')

export const crearPromocionSchema = Yup.object({
  denominacion: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),

  descripcion: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .required('La descripción es requerida'),

  imagenesUrls: Yup.array()
    .of(
      Yup.string()
        .url('Debe ser una URL válida')
        .required('La URL es requerida')
    )
    .min(1, 'Debe agregar al menos una imagen')
    .required('Debe agregar al menos una imagen'),

  categoriaId: Yup.number()
    .typeError('Debe seleccionar una categoría')
    .required('La categoría es requerida'),

  esVendible: Yup.boolean().defined().required('Campo requerido'),
  productoActivo: Yup.boolean().defined().required('Campo requerido'),

  horaDesde: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      'Formato de hora inválido. Ejemplo: 14:30 o 14:30:00'
    )
    .required('La hora de fin es requerida'),

  fechaDesde: Yup.string()
    .required('La fecha de inicio es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),

  fechaHasta: Yup.string()
    .required('La fecha de finalización es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
    .when('fechaDesde', {
      is: (fechaDesde: string) => !!fechaDesde,
      then: schema =>
        schema.test(
          'fecha-hasta-mayor-desde',
          'La fecha de finalización no puede ser anterior a la fecha de inicio',
          function (fechaHasta) {
            const { fechaDesde } = this.parent
            return (
              !fechaDesde ||
              !fechaHasta ||
              dayjs(fechaHasta).isSameOrAfter(dayjs(fechaDesde))
            )
          }
        ),
    }),
  horaHasta: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      'Formato de hora inválido. Ejemplo: 14:30 o 14:30:00'
    )
    .required('La hora de fin es requerida'),
  precioCosto: Yup.number(),
  precioTotal: Yup.number(),
  margen: Yup.number().nullable(),
  productosSeleccionados: productosSeleccionadosSchema,
}).noUnknown(true)

export const editarPromocionSchema = Yup.object({
  denominacion: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),

  descripcion: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .required('La descripción es requerida'),

  imagenesUrls: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().nullable(),
        url: Yup.string()
          .url('Debe ser una URL válida')
          .required('La URL es requerida'),
      })
    )
    .min(1, 'Debe agregar al menos una imagen')
    .required('Debe agregar al menos una imagen'),

  categoriaId: Yup.number()
    .typeError('Debe seleccionar una categoría')
    .required('La categoría es requerida'),

  esVendible: Yup.boolean().defined().required('Campo requerido'),
  productoActivo: Yup.boolean().defined().required('Campo requerido'),

  horaDesde: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      'Formato de hora inválido. Ejemplo: 14:30 o 14:30:00'
    )
    .required('La hora de fin es requerida'),

  fechaDesde: Yup.string()
    .required('La fecha de inicio es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),

  fechaHasta: Yup.string()
    .required('La fecha de finalización es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
    .when('fechaDesde', {
      is: (fechaDesde: string) => !!fechaDesde,
      then: schema =>
        schema.test(
          'fecha-hasta-mayor-desde',
          'La fecha de finalización no puede ser anterior a la fecha de inicio',
          function (fechaHasta) {
            const { fechaDesde } = this.parent
            return (
              !fechaDesde ||
              !fechaHasta ||
              dayjs(fechaHasta).isSameOrAfter(dayjs(fechaDesde))
            )
          }
        ),
    }),
  horaHasta: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/,
      'Formato de hora inválido. Ejemplo: 14:30 o 14:30:00'
    )
    .required('La hora de fin es requerida'),
  precioCosto: Yup.number(),
  precioTotal: Yup.number(),
  productosSeleccionados: productosSeleccionadosSchema,
}).noUnknown(true)
