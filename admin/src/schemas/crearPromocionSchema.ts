import * as Yup from 'yup'

export const crearPromocionSchemaStepOne = Yup.object({
    denominacion: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es requerido'),

    descripcionDescuento: Yup.string()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .required('La descripción es requerida'),

    imagenesUrls: Yup.string()
        .min(1, 'Debes ingresar al menos una URL')
        .required('La imagen es requerida'),

    productoActivo: Yup.boolean().required('Debe seleccionar un estado'),

    categoriaId: Yup.number()
        .typeError('Debe seleccionar una categoría')
        .required('La categoría es requerida'),
})

export const crearPromocionSchemaStepTwo = Yup.object({
    productosSeleccionados: Yup.array()
        .of(
            Yup.object({
                id: Yup.number().required('Producto requerido'),
                nombre: Yup.string().required('Nombre requerido'),
                precioCosto: Yup.number()
                    .transform((value, originalValue) => originalValue === '' || originalValue == null ? 0 : value)
                    .default(0),
                precioVenta: Yup.number()
                    .transform((value, originalValue) => originalValue === '' || originalValue == null ? 0 : value)
                    .required('Precio de venta requerido'),
                tiempoEstimadoMinutos: Yup.number()
                    .transform((value, originalValue) => originalValue === '' || originalValue == null ? 0 : value)
                    .min(0, "Debe ser 0 o mayor")
                    .required("Requerido"),
                cantidad: Yup.number()
                    .transform((value, originalValue) => originalValue === '' || originalValue == null ? 0 : value)
                    .min(1, 'Mínimo 1')
                    .required('Cantidad requerida'),
            })
        )
        .min(1, 'Debes seleccionar al menos un producto')
        .required('Los productos seleccionados son requeridos'),
});

export const crearPromocionSchemaStepThree = Yup.object({
    precioPromocional: Yup.number()
        .typeError('El precio debe ser un número')
        .min(0, 'El precio no puede ser negativo')
        .required('El precio promocional es requerido'),

    fechaDesde: Yup.date()
        .typeError('Debe ser una fecha válida')
        .required('La fecha de inicio es requerida'),

    fechaHasta: Yup.date()
        .typeError('Debe ser una fecha válida')
        .min(Yup.ref('fechaDesde'), 'La fecha de fin debe ser posterior a la de inicio')
        .required('La fecha de finalización es requerida'),

    horaDesde: Yup.date()
        .typeError('Debe ser una hora válida')
        .required('La hora de inicio es requerida'),

    horaHasta: Yup.date()
        .typeError('Debe ser una hora válida')
        .required('La hora de fin es requerida'),


})