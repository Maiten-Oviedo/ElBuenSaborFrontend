// promocionUtils.ts

export interface PromocionStepOneValues {
    denominacion: string
    descripcionDescuento: string
    imagenesUrls: string
    productoActivo: boolean
    categoriaId: number
}

export interface PromocionStepTwoValues {
    productosSeleccionados: {
        id: number
        nombre: string
        cantidad: number
        precioCosto: number
        precioVenta: number
        tiempoEstimadoMinutos: number
    }[]
}

export interface PromocionStepThreeValues {
    precioPromocional: number
    fechaDesde: Date
    fechaHasta: Date
    horaDesde: Date
    horaHasta: Date
}

export const initialValuesPromocion = {
    stepOne: {
        denominacion: '',
        descripcionDescuento: '',
        imagenesUrls: "",
        productoActivo: true,
        categoriaId: 17
    } as unknown as PromocionStepOneValues,

    stepTwo: {
        productosSeleccionados: []
    } as unknown as PromocionStepTwoValues,

    stepThree: {
        precioPromocional: 0,
        fechaDesde: new Date(),
        fechaHasta: new Date(),
        horaDesde: new Date(new Date().setHours(8, 0, 0, 0)),
        horaHasta: new Date(new Date().setHours(23, 59, 0, 0)),
    } as PromocionStepThreeValues,
}

const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0];
};


export const transformPromocionValuesForBackend = (
    stepOne: PromocionStepOneValues,
    stepTwo: PromocionStepTwoValues,
    stepThree: PromocionStepThreeValues
) => {
    const { productosSeleccionados } = stepTwo;

    return {
        denominacion: stepOne.denominacion,
        precioVenta: stepThree.precioPromocional,
        productoActivo: stepOne.productoActivo,
        esVendible: true, // constante fija

        tiempoEstimadoMinutos: productosSeleccionados.reduce(
            (total, p) => total + Number(p.tiempoEstimadoMinutos),
            0
        ),

        imagenesUrls: [stepOne.imagenesUrls],
        categoriaId: parseInt(stepOne.categoriaId as unknown as string, 10),

        fechaDesde: stepThree.fechaDesde,
        fechaHasta:stepThree.fechaHasta ,
        horaDesde: formatTime(stepThree.horaDesde),
        horaHasta: formatTime(stepThree.horaHasta),

        descripcion: stepOne.descripcionDescuento,

        promocionDetalle: productosSeleccionados.map(p => ({
            id: null,
            cantidad: p.cantidad,
            articuloId: p.id,
        })),
    };
};