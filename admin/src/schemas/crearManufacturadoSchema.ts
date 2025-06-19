import * as Yup from 'yup'

export const crearManufacturadoSchemaStepTwo = Yup.object({
  denominacion: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  imagenesUrlsInput: Yup.string(),
  descripcion: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .required('La descripción es requerida'),
  productoActivo: Yup.string().required('El estado es requerido'),
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
          .min(1, 'La cantidad debe ser mayor a 0'),
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
    precioVenta: Yup.number()
      .min(
        precioCosto,
        `El precio de venta no puede ser menor al costo de $${precioCosto.toFixed(
          2
        )}`
      )
      .required('El precio de venta es requerido'),
    precioCosto: Yup.number().required(),
  })
