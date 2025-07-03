import type { IImagenArticulo } from '@/common/types/entities/IImagenArticulo'
import { IArticuloManufacturado } from '../types/entities/IArticuloManufacturado'
import { IArticuloInsumo } from '../types/entities/IArticuloInsumo'
import { IStepTwoValues } from '../types/form.types'

export function transformStepTwoValues(values: IStepTwoValues): {
  denominacion: string
  imagenesUrls: string[]
  descripcion: string
  productoActivo: boolean
  esVendible: boolean
} {
  return {
    denominacion: values.denominacion,
    descripcion: values.descripcion,
    productoActivo: values.productoActivo,
    imagenesUrls: values.imagenesUrls.map(img =>
      typeof img === 'string' ? img : img.url
    ),
    esVendible: values.esVendible ? true : false,
  }
}

//// este lo cambieeeeeeee por las dudas siempre podemos volver al commit anterior
export const transformStepTwoValuesForEdit = (
  values: {
    denominacion: string
    imagenesUrls: (string | IImagenArticulo)[]
    descripcion: string
    productoActivo: boolean
    esVendible: boolean
  },
  originalProduct: IArticuloManufacturado
) => {
  const imagenesUrls: IImagenArticulo[] = values.imagenesUrls.map(img => {
    if (typeof img === 'string') {
      const existente = originalProduct?.imagenesUrls?.find(
        (i): i is IImagenArticulo => typeof i === 'object' && i.url === img
      )
      return existente ?? { id: null, url: img }
    }
    return img // ya es IImagenArticulo
  })

  const esVendible = !!values.esVendible

  return {
    ...values,
    imagenesUrls,
    esVendible,
  }
}
export const createInsumosOptions = (insumos: IArticuloInsumo[]) => {
  return insumos
    .filter(insumo => !insumo.esVendible) // ← Solo los vendibles
    .sort(
      (
        a,
        b //ordena alfabeticamente
      ) =>
        a.denominacion.localeCompare(b.denominacion, 'es', {
          sensitivity: 'base',
        })
    )
    .map(insumo => ({
      label: insumo.denominacion,
      value: insumo.id!,
      unidadMedida: insumo.unidadMedidaEnum,
    }))
}

export const getInitialValuesForEdit = (product: IArticuloManufacturado) => {
  const urls = product?.imagenesUrls as IImagenArticulo[]
  return {
    stepOne: {
      categoriaId: 1,
    },
    stepTwo: {
      denominacion: product?.denominacion ?? '',
      productoActivo: product?.productoActivo ?? true,
      descripcion: product?.descripcion ?? '',
      imagenesUrls: urls ?? [],
      esVendible: product?.esVendible ?? true,
    },
    stepThree: {
      articuloManufacturadoDetalle: product?.articuloManufacturadoDetalle ?? [],
    },
    stepFour: {
      precioCosto: product?.precioCosto ?? 0,
      precioVenta: product?.precioVenta ?? 0,
      tiempoEstimadoMinutos: product?.tiempoEstimadoMinutos ?? 0,
      margen: product?.margen ?? null,
    },
  }
}
