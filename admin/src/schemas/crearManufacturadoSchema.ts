import { IStepTwoValues } from '@/common/types/form.types'
import * as Yup from 'yup'

export const crearManufacturadoSchemaStepTwo: Yup.ObjectSchema<IStepTwoValues> =
  Yup.object({
    denominacion: Yup.string()
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .required('El nombre es requerido'),

    imagenesUrls: Yup.array()
      .min(1, 'Debe agregar al menos una imagen')
      .required('Debe agregar al menos una imagen')
      .test(
        'formato-valido',
        'Debes agregar una imágen con URL válida',
        (value: string[] | undefined) => {
          if (!Array.isArray(value)) return false
          if (value.length === 0) return false

          const isValidStringUrl = (val: any) =>
            typeof val === 'string' && Yup.string().url().isValidSync(val)

          const isValidObjectWithUrl = (val: any) =>
            typeof val === 'object' &&
            val !== null &&
            (val.id === null ||
              val.id === undefined ||
              typeof val.id === 'number') &&
            typeof val.url === 'string' &&
            Yup.string().url().isValidSync(val.url)

          return value.every(
            item => isValidStringUrl(item) || isValidObjectWithUrl(item)
          )
        }
      ),

    descripcion: Yup.string()
      .min(10, 'La descripción debe tener al menos 10 caracteres')
      .required('La descripción es requerida'),

    productoActivo: Yup.boolean().required('El estado es requerido'),
    esVendible: Yup.boolean().required(),
  })

export const crearManufacturadoSchemaStepThree = Yup.object({
  articuloManufacturadoDetalle: Yup.array()
    .of(
      Yup.object({
        articuloInsumoId: Yup.number()
          .required('Debe seleccionar un ingrediente')
          .min(1, 'Debe seleccionar un ingrediente válido'),
        cantidad: Yup.number()
          .required('La cantidad es requerida')
          .min(0.01, 'La cantidad debe ser mayor a 0.01'),
      })
    )
    .min(1, 'Debe agregar al menos un ingrediente')
    .required('Los ingredientes son requeridos'),
})

export const crearManufacturadoSchemaStepFour = (
  tiempoMinimo: number,
  precioCosto: number
) =>
  Yup.object({
    tiempoEstimadoMinutos: Yup.number()
      .min(
        tiempoMinimo,
        `El tiempo no puede ser menor a ${tiempoMinimo} minutos`
      )
      .required('El tiempo estimado es requerido'),
    precioVenta: Yup.number().min(
      precioCosto,
      `El precio de venta no puede ser menor al costo de $${precioCosto.toFixed(
        2
      )}`
    ),
    precioCosto: Yup.number().required(),
    margen: Yup.number()
      .typeError('Debe ser un número')
      .min(0, 'Debe ser un número mayor o igual a 0')
      .nullable(),
  })
